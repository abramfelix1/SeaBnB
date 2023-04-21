const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const {
  validateSpot,
  validateImage,
  validateReview,
} = require("../../utils/validation");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { setPreview, updateOrCreateSpot } = require("../../utils/helpers");

const aggregates = {
  numReviews: [
    sequelize.fn("COUNT", sequelize.col("Bookings.Review.id")),
    "numReviews",
  ],
  avgRating: [
    sequelize.fn("AVG", sequelize.col("Bookings.Review.stars")),
    "avgRating",
  ],
};

/* Get All Reviews By Spot Id */
router.get("/:id/reviews", async (req, res, next) => {
  const spotId = req.params.id;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return next({ message: "Spot couldn't be found", status: 404 });
  }

  const findReview = await Review.findAll({
    include: [
      {
        model: Booking,
        as: "User",
        where: { spotId: spotId },
        include: [{ model: User, attributes: [] }],
        attributes: {
          include: [
            [sequelize.literal('"User->User"."firstName"'), "firstName"],
            [sequelize.literal('"User->User"."firstName"'), "lastName"],
          ],
          exclude: [
            "startDate",
            "endDate",
            "createdAt",
            "updatedAt",
            "spotId",
            "userId",
            "reviewId",
          ],
        },
      },
      {
        model: Image,
        attributes: ["id", "url"],
      },
    ],
    attributes: {
      include: [
        [sequelize.literal('"User"."userId"'), "userId"],
        [sequelize.literal('"User"."spotId"'), "spotId"],
      ],
    },
  });

  const review = { reviews: findReview };
  res.json(review);
});

/* Create Review By Spot Id */
// prettier-ignore
router.post("/:id/reviews", requireAuth, validateReview, async (req, res, next) => {
    const { review, stars } = req.body;
    const { user } = req;
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId);

    const booking = await Booking.findOne({
      where: {
        spotId: spotId,
        userId: user.id,
      },
    });

    if (!spot) {
      return next({ message: "Spot couldn't be found", status: 404 });
    }

    if (!booking) {
      return next({ message: "User hasn't booked this spot", status: 404 });
    }

    if (+booking.userId === +user.id) {
      if (booking.reviewId) {
        return next({
          message: "Review already exists, please edit or delete",
          status: 409,
        });
      }
      const newReview = await booking.createReview({
        review,
        stars,
      });
      const bookingValues = {};
      bookingValues.userId = booking.dataValues.userId;
      bookingValues.spotId = booking.dataValues.spotId;
      const { id, createdAt, updatedAt } = newReview.dataValues;
      const updatedReview = {
        id,
        ...bookingValues,
        review,
        stars,
        createdAt,
        updatedAt,
      };
      res.json(updatedReview);
    }


    return next({ message: "Unauthorized Action", status: 401 });
  }
);

/* Get All Spots From Current User */
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const where = {};
  const attributes = {};
  where.ownerId = user.dataValues.id;
  attributes.include = [aggregates.numReviews, aggregates.avgRating];

  const spots = await Spot.scope({
    method: [
      "getAllSpots",
      where,
      attributes,
      { group: "spot.id", subQuery: false },
    ],
  }).findAll();

  if (spots[0].dataValues.id) {
    setPreview(spots);
    res.json(spots);
  }

  res.json([]);
});

/* Get Spot By Id */
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const spot = await Spot.findByPk(id, {
    include: [
      { model: Image, as: "images", attributes: ["id", "url", "preview"] },
      {
        model: Booking,
        attributes: [],
        include: [{ model: Review, attributes: [] }],
      },
      { model: User, attributes: ["id", "firstName", "lastName"], as: "owner" },
    ],
    attributes: {
      include: [aggregates.numReviews, aggregates.avgRating],
    },
    group: "Images.id",
  });

  !spot
    ? next({ message: `Spot of id: ${id} couldn't be found`, status: 404 })
    : res.json(spot);
});

/* Get All Spots */
router.get("/", async (req, res, next) => {
  /* Query Filters */
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;
  const where = {};
  const attributes = {};
  attributes.include = [aggregates.numReviews, aggregates.avgRating];

  //Validate Query Values
  const validateQueries = [
    page,
    size,
    minLat,
    maxLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice,
  ];

  const check = (value) =>
    (!isNaN(+value) && value >= 0) || value === undefined;

  if (!validateQueries.every((el) => check(el)))
    next({ message: "Invalid Queries", status: 400 });

  // Pagination
  const pagination = { offset: 0, limit: 10 };
  if (page || size) {
    if (!page || page <= 0) page = 1;
    if (!size || size <= 0) size = 10;
    pagination.offset = size * (page - 1);
    pagination.limit = size;
  }

  // Min/Max LAT
  if (minLat && maxLat) {
    where.lat = { [Op.between]: [minLat, maxLat] };
  } else if (minLat) {
    where.lat = { [Op.gte]: minLat };
  } else if (maxLat) where.lat = { [Op.lte]: maxLat };

  // Min/Max LNG
  if (minLng && maxLng) {
    where.Lng = { [Op.between]: [minLng, maxLng] };
  } else if (minLng) {
    where.Lng = { [Op.gte]: minLng };
  } else if (maxLng) where.Lng = { [Op.lte]: maxLng };

  // Min/Max Price
  if (minPrice && maxPrice) {
    where.Price = { [Op.between]: [minPrice, maxPrice] };
  } else if (minPrice) {
    where.Price = { [Op.gte]: minPrice };
  } else if (maxPrice) where.Price = { [Op.lte]: maxPrice };

  const spots = await Spot.scope({
    method: [
      "getAllSpots",
      where,
      attributes,
      { group: "spot.id", subQuery: false, ...pagination },
    ],
  }).findAll();

  setPreview(spots);

  res.json({ spots, page: +page || 1, size: +size || 10 });
});

/* Create Spot */
router.post("/", requireAuth, validateSpot, async (req, res, next) => {
  const attributes = req.body;
  attributes.ownerId = req.user.dataValues.id;

  const newSpot = await updateOrCreateSpot(attributes, "create");

  res.json(newSpot);
});

/* Add Image to a Spot*/
// prettier-ignore
router.post(
  "/:id/image", requireAuth, validateImage, async (req, res, next) => {
    const { url, preview } = req.body;
    const ownerId = req.user.dataValues.id;
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId);
    if (spot) {
      if (+spot.ownerId === +ownerId) {
        const image = await Image.create({
          url,
          preview: preview || false,
          imageableType: "Spot",
          imageableId: spotId,
        });
        res.json(image);
      }
    } else {
      return next({ message: "Spot could not be found", status: 404 });
    }
    return next({ message: "Unauthorized Action", status: 401 });
  }
);

/* Edit Spot */
router.put("/:id", requireAuth, validateSpot, async (req, res, next) => {
  const attributes = req.body;
  const ownerId = req.user.dataValues.id;
  const spotId = req.params.id;
  const spot = await Spot.findByPk(spotId);

  if (spot) {
    if (+spot.ownerId === +ownerId) {
      await updateOrCreateSpot(attributes, "update", spot);
      res.json(spot);
    }
  } else {
    return next({ message: "Spot could not be found", status: 404 });
  }
  return next({ message: "Unauthorized Action", status: 401 });
});

/* Delete Spot */
router.delete("/:id", requireAuth, async (req, res, next) => {
  const spotId = req.params.id;
  const ownerId = req.user.dataValues.id;
  const spot = await Spot.findByPk(spotId);
  if (spot) {
    if (+spot.ownerId === +ownerId) {
      await spot.destroy();
      res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    }
  } else {
    return next({ message: "Spot could not be found", status: 404 });
  }
  return next({ message: "Unauthorized Action", status: 403 });
});

module.exports = router;
