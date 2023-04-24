const sequelize = require("sequelize");
const { Spot, Image, User, Review, Booking } = require("../db/models");

const setPreview = (spots) => {
  if (Array.isArray(spots)) {
    for (const i in spots) {
      if (spots[i].dataValues.previewImage.length) {
        const url = spots[i].dataValues.previewImage[0].dataValues.url;
        spots[i].dataValues.previewImage = url;
      } else {
        spots[i].dataValues.previewImage = "Preview Image Unavailable";
      }
    }
  } else {
    const url = spots.dataValues.previewImage[0].dataValues.url;
    spots.dataValues.previewImage = url;
  }
};

const buildReview = (reviewsObj, spotObj) => {
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

  return Reviews;
};

const buildBookings = (bookingObj, task) => {
  const Bookings = [];
  for (const i in bookingObj) {
    if (task === "current") {
      setPreview(bookingObj[i].dataValues.Spot);
    }

    Bookings[i] = {
      id: bookingObj[i].dataValues.id,
      spotId: bookingObj[i].dataValues.spotId,
      Spot: bookingObj[i].dataValues.Spot,
      userId: bookingObj[i].dataValues.userId,
      startDate: bookingObj[i].dataValues.startDate,
      endDate: bookingObj[i].dataValues.endDate,
      createdAt: bookingObj[i].dataValues.createdAt,
      updatedAt: bookingObj[i].dataValues.updatedAt,
    };
  }

  if (task === "isOwner") {
    const bookings = [];
    for (const i in Bookings) {
      bookings[i] = { User: bookingObj[i].dataValues.User, ...Bookings[i] };
    }
    return bookings;
  }

  return Bookings;
};

const updateOrCreateSpot = async (obj, attributes, task) => {
  if (task === "update") {
    await obj.update({
      ...attributes,
    });
  }
  if (task === "create") {
    const newSpot = await Spot.create({
      ...attributes,
    });
    return newSpot;
  }
};

const updateOrCreateReview = async (obj, attributes, task) => {
  const { review, booking } = obj;

  const { userId, spotId } = booking;

  if (task === "update") {
    await obj.review.update({
      ...attributes,
    });

    const { id, createdAt, updatedAt, stars } = review;

    return {
      id,
      userId,
      spotId,
      review: review.review,
      stars,
      createdAt,
      updatedAt,
    };
  }
  if (task === "create") {
    const newReview = await Review.create({ ...attributes });
    const { id, createdAt, updatedAt, stars } = newReview;
    return {
      id,
      userId,
      spotId,
      review: newReview.review,
      stars,
      createdAt,
      updatedAt,
    };
  }
};

module.exports = {
  setPreview,
  updateOrCreateSpot,
  updateOrCreateReview,
  buildReview,
  buildBookings,
};
