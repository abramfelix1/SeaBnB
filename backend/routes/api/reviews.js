const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateReview, validateImage } = require("../../utils/validation");
const {
  buildPreview,
  buildReview,
  updateOrCreateReview,
} = require("../../utils/helpers");

/* Get Reviews for Current*/
router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req;
  const where = { userId: user.dataValues.id };
  const attributes = { exclude: ["createdAt", "updatedAt"] };

  const reviews = await Review.scope({
    method: ["getAllReviews", where],
  }).findAll();

  const spot = await Spot.scope({
    method: ["getAllSpots", where, attributes, {}, "Review"],
  }).findAll();

  buildPreview(spot);

  const Reviews = buildReview(reviews, spot);

  res.json({ Reviews: Reviews });
});

/* Add Image to a Review */
// prettier-ignore
router.post("/:id/image", requireAuth, validateImage, async (req, res, next) => {
  const { url } = req.body;
  const { user } = req;
  const reviewId = req.params.id;
  const reviewExists = await Review.findByPk(reviewId);

  if(!reviewExists){
    return next({ message: "Review could not be found", status: 404 });
  }

  if (reviewExists) {
    const review = await Review.findOne({
      where: { id: reviewId },
      include: [
        {
          model: Booking,
          as: "User",
          where: { userId: user.dataValues.id },
        },
        {
          model:Image, as:"Images"
        }
      ],
    });

    if (!review) {
      return next({ message: "Unauthorized Action", status: 403 });
    }

    if(review.dataValues.Images.length >= 10){
      return next({ message: "10 image limit reached, remove an image to add new image", status: 400 });
    }

    const image = await Image.create({
      url,
      preview: false,
      imageableType: "Review",
      imageableId: reviewId,
    });
    const { id } = image.dataValues;

    res.json({ id, url });
    }
  }
);

/* Edit a Review */
router.put("/:id", requireAuth, validateReview, async (req, res, next) => {
  const attributes = req.body;
  const { user } = req;
  const reviewId = req.params.id;
  const review = await Review.findByPk(reviewId);
  const booking = await Booking.findOne({
    where: {
      userId: user.dataValues.id,
      reviewId: reviewId,
    },
  });

  if (!review) {
    return next({ message: "Review could not be found", status: 404 });
  }

  if (!booking) {
    return next({ message: "Unauthorized Action", status: 403 });
  }

  if (!booking.reviewId) {
    return next({
      message: "Review doesn't exist, please create a review",
      status: 409,
    });
  }

  await updateOrCreateReview(
    { review: review, booking: booking },
    attributes,
    "update"
  );

  res.json(review);
});

/* Delete a Review */
router.delete("/:id", requireAuth, async (req, res, next) => {
  const { user } = req;
  const reviewId = req.params.id;
  const review = await Review.findByPk(reviewId);
  const booking = await Booking.findOne({
    where: {
      userId: user.dataValues.id,
      reviewId: reviewId,
    },
  });

  if (!review) {
    return next({ message: "Review couldn't be found", status: 404 });
  }

  if (!booking) {
    return next({ message: "Unauthorized Action", status: 403 });
  }

  await booking.update({
    reviewId: null,
  });

  await review.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
