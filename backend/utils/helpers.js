const { Spot, Image, User, Review, Booking } = require("../db/models");
const { Op } = require("sequelize");

const buildPreview = (spots) => {
  if (!Array.isArray(spots)) spots = [spots];
  for (const i in spots) {
    if (spots[i].dataValues.previewImage.length) {
      const url = spots[i].dataValues.previewImage[0].dataValues.url;
      spots[i].dataValues.previewImage = url;
    } else {
      spots[i].dataValues.previewImage = "Preview Image Unavailable";
    }
  }
};

const setQuery = ({ minLat, maxLat, minLng, maxLng, minPrice, maxPrice }) => {
  const where = {};
  // Min/Max LAT
  if (minLat && maxLat) {
    where.lat = { [Op.between]: [minLat, maxLat] };
  } else if (minLat) {
    where.lat = { [Op.gte]: minLat };
  } else if (maxLat) where.lat = { [Op.lte]: maxLat };

  // Min/Max LNG
  if (minLng && maxLng) {
    where.lng = { [Op.between]: [minLng, maxLng] };
  } else if (minLng) {
    where.lng = { [Op.gte]: minLng };
  } else if (maxLng) where.lng = { [Op.lte]: maxLng };

  // Min/Max Price
  if (minPrice && maxPrice) {
    where.price = { [Op.between]: [minPrice, maxPrice] };
  } else if (minPrice) {
    where.price = { [Op.gte]: minPrice };
  } else if (maxPrice) where.price = { [Op.lte]: maxPrice };

  return where;
};

// const setReviewsRatings = async (spots) => {
//   if (!Array.isArray(spots)) spots = [spots];
//   for (const i in spots) {
//     let bookings = await spots[i].getBookings({
//       include: [{ model: Review }],
//       attributes: [
//         [sequelize.fn("COUNT", sequelize.col("Review.id")), "numReviews"],
//         [sequelize.fn("AVG", sequelize.col("Review.stars")), "avgRating"],
//       ],
//       group: ["Booking.id"],
//     });

//     spots[i].dataValues.numReviews = bookings[0].numReviews || 0;
//     spots[i].dataValues.avgRating = bookings[0].avgRating || null;
//   }
// };

const setReviewsRatings = async (spots) => {
  if (!Array.isArray(spots)) spots = [spots];
  for (const i in spots) {
    let numReviews = 0;
    let totalRatings = 0;
    let bookings = await spots[i].getBookings({
      include: [{ model: Review, attributes: ["id", "stars"] }],
    });

    for (const booking of bookings) {
      if (booking.dataValues.Review) {
        numReviews += 1;
        totalRatings += booking.dataValues.Review.stars;
      }
    }

    spots[i].dataValues.numReviews = numReviews || 0;
    spots[i].dataValues.avgRating = totalRatings / numReviews || null;
  }
};

const changePreview = async (spot) => {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  for (const image of spot.dataValues.SpotImages) {
    if (image.dataValues.preview === true) {
      const id = image.dataValues.id;
      const imageToUpdate = await Image.findByPk(id);
      await imageToUpdate.update({
        preview: false,
      });
    }
  }
};

const buildSpots = (spotsObj) => {
  const Spots = [];
  if (!Array.isArray(spotsObj)) spotsObj = [spotsObj];
  for (const i in spotsObj) {
    Spots[i] = {
      id: spotsObj[i].dataValues.id,
      ownerId: spotsObj[i].dataValues.ownerId,
      address: spotsObj[i].dataValues.address,
      city: spotsObj[i].dataValues.city,
      country: spotsObj[i].dataValues.country,
      state: spotsObj[i].dataValues.state,
      lat: spotsObj[i].dataValues.lat,
      lng: spotsObj[i].dataValues.lng,
      name: spotsObj[i].dataValues.name,
      description: spotsObj[i].dataValues.description,
      price: spotsObj[i].dataValues.price,
      createdAt: spotsObj[i].dataValues.createdAt,
      updatedAt: spotsObj[i].dataValues.updatedAt,
      numReviews: spotsObj[i].dataValues.numReviews,
      avgRating: spotsObj[i].dataValues.avgRating,
      previewImage: spotsObj[i].dataValues.previewImage,
      SpotImages: spotsObj[i].dataValues.SpotImages,
      Owner: spotsObj[i].dataValues.Owner,
    };
  }
  if (Spots.length === 1) return Spots[0];
  return Spots;
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
      buildPreview(bookingObj[i].dataValues.Spot);
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

const checkBookingError = (bookings, { startDate, endDate }, userId) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const err = {
    message: "Spot is already booked within the specified dates",
    status: 403,
  };
  const errSet = new Set();
  for (const booking of bookings) {
    const checkStart = booking.dataValues.startDate.getTime();
    const checkEnd = booking.dataValues.endDate.getTime();
    if (start >= checkStart && start <= checkEnd) {
      errSet.add("Start date conflicts with an existing booking");
    }
    if (end >= checkStart && end <= checkEnd) {
      errSet.add("End date conflicts with an existing booking");
    }
    if (start < checkStart && end > checkEnd) {
      delete err.errors;
      err.errors = ["Specified dates conflict with an existing booking"];
      return err;
    }
  }

  err.errors = [...errSet];
  return err;
};

module.exports = {
  buildPreview,
  setQuery,
  setReviewsRatings,
  buildSpots,
  changePreview,
  updateOrCreateSpot,
  updateOrCreateReview,
  buildReview,
  buildBookings,
  checkBookingError,
};
