const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const {
  validateSpot,
  validateImage,
  validateReview,
  validateBooking,
} = require("../../utils/validation");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const {
  setPreview,
  buildReview,
  updateOrCreateSpot,
  updateOrCreateReview,
} = require("../../utils/helpers");
const booking = require("../../db/models/booking");

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

/* Get All Bookings By Spot Id */
router.get("/:id/bookings", async (req, res, next) => {
  const { user } = req;
  const spotId = req.params.id;
  const spot = await Spot.findByPk(spotId);
  const attributes = {};

  if (!spot) {
    return next({ message: "Spot couldn't be found", status: 404 });
  }

  if (spot.ownerId === user.dataValues.id) {
    attributes.include = [
      { model: User, attributes: ["id", "firstName", "lastName"] },
    ];
  } else {
    attributes.attributes = {
      exclude: ["id", "userId", "reviewId", "createdAt", "updatedAt"],
    };
  }

  const bookings = await Booking.findAll({
    where: { spotId: spotId },
    ...attributes,
  });
  if (!bookings) {
    return next({ message: "No Bookings found", status: 404 });
  }

  if (spot.ownerId === user.dataValues.id) {
    const buildBookings = [];
    for (const i in bookings) {
      const {
        User,
        id,
        spotId,
        userId,
        startDate,
        endDate,
        createdAt,
        updatedAt,
      } = bookings[i];
      const booking = {
        User,
        id,
        spotId,
        userId,
        startDate,
        endDate,
        createdAt,
        updatedAt,
      };
      console.log(booking);
      buildBookings[i] = booking;
    }
    res.json({ Bookings: buildBookings });
  }

  res.json(bookings);
});

/* Create Booking By Spot Id */
// prettier-ignore
router.post( "/:id/bookings", requireAuth, validateBooking, async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const { user } = req;
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return next({ message: "Spot couldn't be found", status: 404 });
    }

    const booking = await spot.getBookings({
      where: {
        [Op.or]:{
        startDate: { [Op.between]: [`${new Date(startDate).toISOString()}`,`${new Date(endDate).toISOString()}`]},
        endDate: { [Op.between]: [`${new Date(startDate).toISOString()}`,`${new Date(endDate).toISOString()}`]},
        }
      },
    });

    if (booking.length) {
      return next({
        message: `Spot is already booked within the specified dates`,
        status: 403,
        errors: [
          "Start date conflicts with an existing booking",
          "End date conflicts with an existing booking",
        ],
      });
    }

    const newBooking = await Booking.create({
      spotId,
      userId: user.id,
      startDate,
      endDate,
    });

    res.json(newBooking);
  }
);

/* Get All Reviews By Spot Id */
router.get("/:id/reviews", async (req, res, next) => {
  const spotId = req.params.id;
  const where = { spotId: spotId };
  const spot = await Spot.findByPk(spotId);

  const reviews = await Review.scope({
    method: ["getAllReviews", where],
  }).findAll();

  if (!spot) {
    return next({ message: "Spot couldn't be found", status: 404 });
  }

  const Reviews = buildReview(reviews, spot, "noSpots");

  res.json({ Reviews: Reviews });
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
        userId: user.dataValues.id,
      },
    });

    if (!spot) {
      return next({ message: "Spot couldn't be found", status: 404 });
    }

    if (!booking) {
      return next({ message: "User hasn't booked this spot", status: 403 });
    }

    if (booking.reviewId) {
        return next({
          message: "Review already exists, please edit or delete",
          status: 409,
        });
      }

    const updatedReview = await updateOrCreateReview(
      {booking} ,
      req.body,
      "create"
    );

    res.json(updatedReview);
});

/* Get All Spots From Current User */
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const where = { ownerId: user.dataValues.id };
  const attributes = {};
  attributes.include = [aggregates.numReviews, aggregates.avgRating];

  const spots = await Spot.scope({
    method: [
      "getAllSpots",
      where,
      attributes,
      { group: "spot.id", subQuery: false },
      "Spot",
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

  if (!spot) {
    return next({
      message: `Spot of id: ${id} couldn't be found`,
      status: 404,
    });
  }

  res.json(spot);
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
      "Spot",
    ],
  }).findAll();

  setPreview(spots);

  res.json({ Spots: spots, page: +page || 1, size: +size || 10 });
});

/* Create Spot */
router.post("/", requireAuth, validateSpot, async (req, res, next) => {
  const attributes = { ownerId: req.user.dataValues.id, ...req.body };

  const newSpot = await updateOrCreateSpot({}, attributes, "create");

  res.json(newSpot);
});

/* Add Image to a Spot*/
// prettier-ignore
router.post(
  "/:id/image", requireAuth, validateImage, async (req, res, next) => {
    const { url, preview } = req.body;
    const { user } = req;
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return next({ message: "Spot could not be found", status: 404 });
    }

    if (+spot.ownerId !== +user.dataValues.id) {
      return next({ message: "Unauthorized Action", status: 403 });
    }

    const image = await Image.create({
      url,
      preview: preview || false,
      imageableType: "Spot",
      imageableId: spotId,
    });
    const {id} = image.dataValues

    res.json({id,url,preview:image.dataValues.preview});
  }
);

/* Edit Spot */
router.put("/:id", requireAuth, validateSpot, async (req, res, next) => {
  const attributes = req.body;
  const { user } = req;
  const spotId = req.params.id;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return next({ message: "Spot could not be found", status: 404 });
  }

  if (+spot.ownerId !== +user.dataValues.id) {
    return next({ message: "Unauthorized Action", status: 403 });
  }

  await updateOrCreateSpot(spot, attributes, "update");

  res.json(spot);
});

/* Delete Spot */
router.delete("/:id", requireAuth, async (req, res, next) => {
  const { user } = req;
  const spotId = req.params.id;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return next({ message: "Spot could not be found", status: 404 });
  }

  if (+spot.ownerId !== +user.dataValues.id) {
    return next({ message: "Unauthorized Action", status: 403 });
  }

  await spot.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
