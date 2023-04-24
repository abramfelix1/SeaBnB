const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateBooking } = require("../../utils/validation");
const { buildBookings } = require("../../utils/helpers");

/* Get All Bookings of Current */
router.get("/current", async (req, res, next) => {
  const { user } = req;
  const where = { userId: user.dataValues.id };
  const attributes = {};
  attributes.attributes = {
    exclude: ["description", "createdAt", "updatedAt"],
  };

  const bookings = await Booking.scope({
    method: ["getAllBookings", where],
  }).findAll();

  const Bookings = buildBookings(bookings, "current");

  res.json({ Bookings: Bookings });
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

  if (booking.dataValues.endDate.getTime() <= new Date().getTime()) {
    return next({
      message: "Past bookings can't be modified",
      statusCode: 403,
    });
  }

  if (
    booking.dataValues.startDate.getTime() <= new Date(startDate).getTime() &&
    booking.dataValues.endDate.getTime() >= new Date(endDate).getTime()
  ) {
    return next({
      message: `Spot is already booked within the specified dates`,
      status: 403,
      errors: [
        "Start date conflicts with an existing booking",
        "End date conflicts with an existing booking",
      ],
    });
  }

  await booking.update({
    startDate,
    endDate,
  });

  res.json({});
});

/* Delete Booking */
router.delete("/:id", requireAuth, async (req, res, next) => {
  const { user } = req;
  const bookingId = req.params.id;
  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    return next({ message: "Booking couldn't be found", status: 404 });
  }

  if (+booking.userId !== +user.dataValues.id) {
    return next({ message: "Unauthorized action", status: 403 });
  }

  if (
    booking.dataValues.startDate.getTime() <= new Date().getTime() &&
    booking.dataValues.endDate.getTime() >= new Date().getTime()
  ) {
    return next({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403,
    });
  }

  await booking.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
