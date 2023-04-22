const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateBooking } = require("../../utils/validation");
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
router.put("/:id", requireAuth, validateBooking, async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const { user } = req;
  const bookingId = req.params.id;
  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    return next({ message: "Booking not found", status: 404 });
  }

  if (booking.userId !== user.dataValues.id) {
    return next({ message: "Unauthorized Action", status: 403 });
  }

  if (booking.endDate === "2024-12-12T00:00:00.000Z") {
    return next({
      message: "Past bookings can't be modified",
      statusCode: 403,
    });
  }

  await booking.update({
    startDate,
    endDate,
  });

  res.json(booking);
});

module.exports = router;
