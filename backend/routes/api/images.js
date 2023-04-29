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
    const spot = await image.getSpot({
      include: { model: Image, as: "images" },
    });

    if (+spot.ownerId !== user.dataValues.id) {
      return next({ message: "Unauthorized action", status: 403 });
    }

    const deletedImage = await image.destroy();

    if (image.dataValues.preview === true) {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
      let imageId = spot.dataValues.images[0].dataValues.id;
      console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBB");
      console.log(deletedImage.dataValues.id);
      if (deletedImage.dataValues.id === imageId) {
        console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCC");

        console.log(spot.dataValues.images[1].dataValues.id);
        imageId = spot.dataValues.images[1].dataValues.id;
      }

      console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDD");

      const newPreviewImage = await Image.findByPk(imageId);
      console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEE");
      await newPreviewImage.update({
        preview: true,
      });

      return res.json({
        message: "Successfully deleted, new previewImage set",
        statusCode: 200,
      });
    }
  }

  if (imageType === "Review") {
    const review = await image.getReview({
      include: { model: Booking, as: "User", attributes: ["userId"] },
    });

    if (+review.User.userId !== user.dataValues.id) {
      return next({ message: "Unauthorized action", status: 403 });
    }
    await image.destroy();
  }

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
