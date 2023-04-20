const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateReview } = require("../../utils/validation");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const {} = require("../../utils/helpers");

/* Edit a Review */
router.put("/:id", requireAuth, validateReview, async (req, res, next) => {
  const { review, stars } = req.body;
  const { user } = req;
  const reviewId = req.params.id;

  const editReview = await Review.findByPk(reviewId);
  if (!editReview) {
    return next({ message: "Review could not be found", status: 404 });
  }

  const booking = await Booking.findOne({
    where: {
      userId: user.id,
      reviewId: reviewId,
    },
  });

  if (!booking) {
    return next({ message: "User hasn't booked this spot", status: 404 });
  }

  if (+booking.userId === +user.id) {
    if (!booking.reviewId) {
      return next({
        message: "Review doesn't exist, please create a review",
        status: 409,
      });
    }
    await editReview.update({
      review,
      stars,
    });
    const bookingValues = {};
    bookingValues.userId = booking.dataValues.userId;
    bookingValues.spotId = booking.dataValues.spotId;
    const { id, createdAt, updatedAt } = editReview.dataValues;
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
});

module.exports = router;
