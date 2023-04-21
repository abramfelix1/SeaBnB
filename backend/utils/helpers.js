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

module.exports = {
  setPreview,
  updateOrCreateSpot,
};
