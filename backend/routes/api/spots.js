const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const {
  validateSpot,
  validateImage,
  validateReview,
  validateBooking,
  validateQueries,
} = require("../../utils/validation");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const {
  buildPreview,
  setQuery,
  setReviewsRatings,
  buildSpots,
  changePreview,
  buildReview,
  updateOrCreateSpot,
  updateOrCreateReview,
  buildBookings,
  checkBookingError,
} = require("../../utils/helpers");

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
router.get("/:id/bookings", requireAuth, async (req, res, next) => {
  const { user } = req;
  const spotId = req.params.id;
  const spot = await Spot.findByPk(spotId);
  const attributes = {};

  if (!spot) {
    return next({
      message: "Bookings for spot couldn't be found",
      status: 404,
    });
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
    const Bookings = buildBookings(bookings, "isOwner");
    return res.json({ Bookings: Bookings });
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

    if(spot.ownerId === user.dataValues.id){
      return next({message: "Cannot book owned spots", status:400})
    }

    const hasActiveBooking = await spot.getBookings({
      where:{
        userId: user.dataValues.id,
        startDate: { [Op.gte]: [`${new Date().toISOString()}`]},
      }
    })

    if(hasActiveBooking.length){
      return next({errors:{message:"User already has an active booking", status:403}})
    }

    const checkBooking = await spot.getBookings({
      where: {
        [Op.or]:{
        startDate: { [Op.between]: [`${new Date(startDate).toISOString()}`,`${new Date(endDate).toISOString()}`]},
        endDate: { [Op.between]: [`${new Date(startDate).toISOString()}`,`${new Date(endDate).toISOString()}`]},
        }
      },
    });

    if (checkBooking.length) {
      return next(checkBookingError(checkBooking, req.body, user.dataValues.id));
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

  if (!spot) {
    return next({ message: "Reviews for spot couldn't be found", status: 404 });
  }

  const reviews = await Review.scope({
    method: ["getAllReviews", where],
  }).findAll();

  const Reviews = buildReview(reviews, spot);
  res.json({ Reviews: Reviews });
});

/* Create Review By Spot Id */
// prettier-ignore
router.post("/:id/reviews", requireAuth, validateReview, async (req, res, next) => {
    const { review, stars } = req.body;
    const { user } = req;
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId);
    const attributes = {userId: user.dataValues.id, ...req.body}

    if (!spot) {
      return next({ errors: {review:"Spot couldn't be found"}, status: 404 });
    }

    if(spot.ownerId === user.dataValues.id){
      return next({errors: {review: "Cannot review owned spots"}, status:400})
    }

    const booking = await Booking.findOne({
      where: {
        spotId: spotId,
        userId: user.dataValues.id,
      },
    });

    if (!booking) {
      return next({ errors: {review:"No Bookings Found"}, status: 403 });
    }

    if (booking.reviewId) {
        return next({
          errors: {review:"Review already exists, please edit or delete"},
          status: 409,
        });
      }

    const updatedReview = await updateOrCreateReview(
      {booking} ,
      attributes,
      "create"
    );

    await booking.update({
      reviewId:updatedReview.id
    })


    res.json(updatedReview);
});

/* Get All Spots From Current User */
router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req;
  const where = { ownerId: user.dataValues.id };

  const spots = await Spot.findAll({
    where,
    include: [
      {
        model: Image,
        as: "previewImage",
        where: { preview: true },
        attributes: ["url"],
        required: false,
      },
    ],
  });

  if (!spots.length) {
    res.json({ Spots: [] });
  }

  buildPreview(spots);

  await setReviewsRatings(spots);

  const Spots = buildSpots(spots);

  res.json({ Spots: Spots });
});

/* Get Spot By Id */
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  const spot = await Spot.findByPk(id, {
    include: [
      { model: Image, as: "SpotImages", attributes: ["id", "url", "preview"] },
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "profileImg"],
        as: "Owner",
      },
    ],
    group: ["Spot.id", "SpotImages.id", "Owner.id"],
  });

  if (!spot) {
    return next({
      message: `Spot of id: ${id} couldn't be found`,
      status: 404,
    });
  }

  await setReviewsRatings(spot);

  res.json(buildSpots(spot));
});

/* Get All Spots */
router.get("/", validateQueries, async (req, res, next) => {
  let { page, size } = req.query;
  const where = setQuery(req.query);
  const attributes = {};
  attributes.include = [aggregates.numReviews, aggregates.avgRating];
  // Pagination
  const pagination = { offset: 0, limit: 20 };

  if (page || size) {
    if (page <= 0) page = 1;
    if (size > 20) size = 20;
    pagination.offset = size * (page - 1);
    pagination.limit = size;
  } else {
    page = 1;
    size = 20;
  }

  const spots = await Spot.findAll({
    where,
    include: [
      {
        model: Image,
        as: "previewImage",
        where: { preview: true },
        attributes: ["url"],
        required: false,
      },
    ],
    ...pagination,
    group: [],
  });

  buildPreview(spots);

  await setReviewsRatings(spots);

  const Spots = buildSpots(spots);

  const totalItems = await Spot.findAll({ where });
  const showing = Math.min(totalItems.length - (page - 1) * size, size);
  const totalPages = Math.ceil(totalItems.length / size);
  const pageDirectory = `${+page || 1} / ${totalPages}`;

  if (page > totalPages) {
    next({ message: "No Spots found", status: 404 });
  }

  res.json({
    Spots: Spots,
    page: pageDirectory,
    size: +size || 20,
    results: totalItems.length,
    showing: `${1 + showing + showing * (page - 1) - showing}-${
      showing + showing * (page - 1)
    }`,
  });
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
    const { url } = req.body;
    let { preview } = req.body;
    const { user } = req;
    const spotId = req.params.id;
    const spot = await Spot.findOne({
      where:{id:spotId},
      include:[{ model: Image, as: "SpotImages"}],
      group: ["Spot.id","SpotImages.id"],
    });

    if (!spot) {
      return next({errors: { image: "Spot could not be found", status: 404 }});
    }

    if (+spot.ownerId !== +user.dataValues.id) {
      return next({errors: { image: "Unauthorized Action", status: 403 }});
    }

    if(spot.dataValues.SpotImages.length >= 10){
      return next({errors: { image: "10 image limit reached, remove an image to add new image", status: 400 }});
    }

    if(spot.dataValues.SpotImages.length === 0){
      preview = true
    }

    if(preview === true) await changePreview(spot)

    const image = await Image.create({
      url,
      preview: preview || false,
      imageableType: "Spot",
      imageableId: spotId,
    });
    const {id} = image.dataValues

    res.json({id,url,preview});
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
