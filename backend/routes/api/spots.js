const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const sequelize = require("sequelize");
const review = require("../../db/models/review");

const associatedAttributes = {};
(associatedAttributes.attributes = [
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
  [sequelize.fn("COUNT", sequelize.col("Bookings.Review")), "numReviews"],
  [sequelize.fn("AVG", sequelize.col("Bookings.Review.stars")), "avgRating"],
]),
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
        { model: Booking, include: [{ model: Review }] },
      ],
      where: {
        ownerId: user.dataValues.id,
      },
      attributes: [
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
        [
          sequelize.fn("AVG", sequelize.col("Bookings.Review.stars")),
          "avgRating",
        ],
      ],
    });

    if (!spots.previewImage) {
      spots.previewImage = "Preview Image Unavailable";
    }

    res.json(spots);
  });

/* Get Spot By Id */
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const spot = await Spot.findByPk(id, {
    include: [{ model: Image, as: "images" }],
  });

  !spot
    ? next({ message: "Spot couldn't be found", status: 404 })
    : res.json(spot);
});

/* Get All Spots */
router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll({
    include: {
      model: Image,
      as: "previewImage",
      where: { preview: 1 },
      attributes: ["url"],
    },
  });
  res.json(spots);
});

module.exports = router;
