const sequelize = require("sequelize");
const { Spot, Image, User, Review, Booking } = require("../db/models");

const setPreview = (spots) => {
  for (const i in spots) {
    if (spots[i].dataValues.previewImage.length) {
      const url = spots[i].dataValues.previewImage[0].dataValues.url;
      spots[i].dataValues.previewImage = url;
    } else {
      spots[i].dataValues.previewImage = "Preview Image Unavailable";
    }
  }
};

const updateOrCreateSpot = async (attributes, task, obj) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    attributes;
  if (task === "update") {
    await obj.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
  }
  if (task === "create") {
    const newSpot = await Spot.create({
      ownerId: attributes.ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    return newSpot;
  }
};

const buildReview = (reviewsObj, spotObj, task) => {
  const Reviews = [];
  for (const i in reviewsObj) {
    Reviews[i] = {
      id: reviewsObj[i].dataValues.id,
      userId: reviewsObj[i].dataValues.userId,
      spotId: reviewsObj[i].dataValues.spotId,
      review: reviewsObj[i].dataValues.review,
      stars: reviewsObj[i].dataValues.stars,
      createdAt: reviewsObj[i].dataValues.createdAt,
      updatedAt: reviewsObj[i].dataValues.updatedAt,
      User: reviewsObj[i].dataValues.User.dataValues,
      Spot: spotObj[i],
      ReviewImages: [...reviewsObj[i].dataValues.Images],
    };
  }

  if (task === "noSpots") {
    Reviews.splice(8, 1);
  }

  return Reviews;
};

module.exports = {
  setPreview,
  updateOrCreateSpot,
  buildReview,
};
