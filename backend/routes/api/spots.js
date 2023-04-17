const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const sequelize = require("sequelize");
const review = require("../../db/models/review");

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
const attributes = [
  "id",
  "ownerId",
  "address",
  "city",
  "state",
  "country",
  "lat",
  "lng",
  "name",
  "description",
  "price",
  "createdAt",
  "updatedAt",
];

/* Get All Spots From Current User */
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const spots = await Spot.findAll({
    include: [
      {
        model: Image,
        as: "previewImage",
        attributes: ["url"],
      },
      {
        model: Booking,
        attributes: [],
        include: [{ model: Review }],
      },
    ],
    where: {
      ownerId: user.dataValues.id,
    },
    attributes: [...attributes, aggregates.numReviews, aggregates.avgRating],
  });

  const url = spots[0].dataValues.previewImage[0].dataValues.url;

  spots[0].dataValues.previewImage
    ? (spots[0].dataValues.previewImage = url)
    : (spots[0].dataValues.previewImage = "Preview Image Unavailable");

  res.json(spots);
});

/* Get Spot By Id */
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const spot = await Spot.findByPk(id, {
    include: [
      { model: Image, as: "images" },
      {
        model: Booking,
        attributes: [],
        include: [{ model: Review, attributes: [] }],
      },
    ],
    attributes: [...attributes, aggregates.numReviews, aggregates.avgRating],
  });

  !spot
    ? next({ message: "Spot couldn't be found", status: 404 })
    : res.json(spot);
});

/* Get All Spots */
router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll({
    include: [
      {
        model: Image,
        as: "previewImage",
        where: { preview: 1 },
        attributes: ["url"],
      },
      { model: Booking, attributes: [], include: [{ model: Review }] },
    ],
    attributes: [...attributes],
  });
  res.json(spots);
});

module.exports = router;
