const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const {} = require("../../utils/validation");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { setPreview } = require("../../utils/helpers");

/* Get All Bookings of Current */
router.get("/current", async (req, res, next) => {
  const { user } = req;
  const bookings = await Booking.findAll({
    where: {
      userId: user.dataValues.id,
    },
    include: [
      {
        model: Spot,
        include: [
          {
            model: Image,
            as: "previewImage",
            where: { preview: 1 },
            attributes: ["url"],
          },
        ],
        attributes: { exclude: ["description", "createdAt", "updatedAt"] },
      },
    ],
    attributes: [
      "id",
      "spotId",
      "userId",
      "startDate",
      "endDate",
      "createdAt",
      "updatedAt",
    ],
  });

  const buildBookings = [];
  for (const i in bookings) {
    const {
      id,
      spotId,
      Spot,
      userId,
      startDate,
      endDate,
      createdAt,
      updatedAt,
    } = bookings[i].dataValues;
    setPreview(Spot);
    buildBookings[i] = {
      id,
      spotId,
      Spot,
      userId,
      startDate,
      endDate,
      createdAt,
      updatedAt,
    };
  }

  res.json({ Bookings: buildBookings });
});

/* Edit a Booking */

module.exports = router;
