const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateReview, validateImage } = require("../../utils/validation");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { setPreview } = require("../../utils/helpers");
const user = require("../../db/models/user");

/* Get Reviews for Current*/
router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req;

  const reviews = await Review.findAll({
    include: [
      {
        model: Booking,
        as: "User",
        where: { userId: user.id },
        include: [{ model: User, attributes: [] }],
        attributes: [
          "id",
          [sequelize.literal('"User->User"."firstName"'), "firstName"],
          [sequelize.literal('"User->User"."firstName"'), "lastName"],
        ],
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

  const spot = await Spot.findAll({
    include: [
      { model: Booking, where: { userId: user.id }, attributes: [] },
      {
        model: Image,
        as: "previewImage",
        where: { preview: 1 },
        attributes: ["url"],
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  setPreview(spot);

  const Reviews = [];
  for (const i in reviews) {
    Reviews[i] = {
      id: reviews[i].dataValues.id,
      userId: reviews[i].dataValues.userId,
      spotId: reviews[i].dataValues.spotId,
      review: reviews[i].dataValues.review,
      stars: reviews[i].dataValues.stars,
      createdAt: reviews[i].dataValues.createdAt,
      updatedAt: reviews[i].dataValues.updatedAt,
      User: reviews[i].dataValues.User.dataValues,
      Spot: spot[i],
      ReviewImages: [...reviews[i].dataValues.Images],
    };
  }
  res.json({ Reviews: Reviews });
});

/* Add Image to a Review */

router.post(
  "/:id/image",
  requireAuth,
  validateImage,
  async (req, res, next) => {
    const { url } = req.body;
    const { user } = req;
    const reviewId = req.params.id;
    const reviewExists = await Review.findByPk(reviewId);
    if (reviewExists) {
      const review = await Review.findOne({
        where: { id: reviewId },
        include: [
          {
            model: Booking,
            as: "User",
            where: { userId: user.id },
          },
        ],
      });
      if (review) {
        const image = await Image.create({
          url,
          preview: false,
          imageableType: "Review",
          imageableId: reviewId,
        });
        const { id } = image.dataValues;
        res.json({ id, url });
      }
    } else {
      return next({ message: "Review could not be found", status: 404 });
    }
    return next({ message: "Unauthorized Action", status: 403 });
  }
);

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
    return next({ message: "User hasn't booked this spot", status: 403 });
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

  return next({ message: "Unauthorized Action", status: 403 });
});

/* Delete a Review */
router.delete("/:id", requireAuth, async (req, res, next) => {
  const { user } = req;
  const reviewId = req.params.id;
  const review = await Review.findByPk(reviewId);
  const booking = await Booking.findOne({
    where: { reviewId: reviewId, userId: user.id },
  });

  if (!review) {
    return next({ message: "Review couldn't be found", status: 404 });
  }

  if (booking) {
    await review.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }

  return next({ message: "Unauthorized action", status: 403 });
});

module.exports = router;
