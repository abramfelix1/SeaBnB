const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

/* Delete Image for Spot and Review */
router.delete("/:id", requireAuth, async (req, res, next) => {
  const { user } = req;
  const imageId = req.params.id;
  const image = await Image.findByPk(imageId);

  if (!image) {
    return next({ message: "Image could not be found", status: 404 });
  }

  const imageType = image.imageableType;

  if (imageType === "Spot") {
    const spot = await image.getSpot();

    if (+spot.ownerId !== user.dataValues.id) {
      return next({ message: "Unauthorized action", status: 403 });
    }
  }

  if (imageType === "Review") {
    const review = await image.getReview({
      include: { model: Booking, as: "User", attributes: ["userId"] },
    });

    if (+review.User.userId !== user.dataValues.id) {
      return next({ message: "Unauthorized action", status: 403 });
    }
  }

  await image.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
