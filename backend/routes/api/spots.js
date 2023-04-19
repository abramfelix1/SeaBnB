const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateSpot } = require("../../utils/validation");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { setPreview } = require("../../utils/helpers");

const aggregates = {
  numReviews: [
    sequelize.fn("COUNT", sequelize.col("Bookings.Review.id")),
    "numReviews",
  ],
  avgRating: [
    sequelize.fn("AVG", sequelize.col("Bookings.Review.stars")),
    "avgRating",
  ],
};

/* Get All Spots From Current User */
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const where = {};
  const attributes = {};
  where.ownerId = user.dataValues.id;
  attributes.include = [aggregates.numReviews, aggregates.avgRating];

  const spots = await Spot.scope({
    method: [
      "getAllSpots",
      where,
      attributes,
      { group: "spot.id", subQuery: false },
    ],
  }).findAll();

  if (spots[0].dataValues.id) {
    setPreview(spots);
    res.json(spots);
  }

  res.json([]);
});

/* Get Spot By Id */
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const spot = await Spot.findByPk(id, {
    include: [
      { model: Image, as: "images", attributes: ["id", "url", "preview"] },
      {
        model: Booking,
        attributes: [],
        include: [{ model: Review, attributes: [] }],
      },
      { model: User, attributes: ["id", "firstName", "lastName"], as: "owner" },
    ],
    attributes: {
      include: [aggregates.numReviews, aggregates.avgRating],
    },
    group: "Images.id",
  });

  !spot
    ? next({ message: `Spot of id: ${id} couldn't be found`, status: 404 })
    : res.json(spot);
});

/* Get All Spots */
router.get("/", async (req, res, next) => {
  /* Query Filters */
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;
  const where = {};
  const attributes = {};
  attributes.include = [aggregates.numReviews, aggregates.avgRating];

  //Validate Query Values
  const validateQueries = [
    page,
    size,
    minLat,
    maxLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice,
  ];

  const check = (value) =>
    (!isNaN(+value) && value >= 0) || value === undefined;

  if (!validateQueries.every((el) => check(el)))
    next({ message: "Invalid Queries", status: 400 });

  // Pagination
  const pagination = { offset: 0, limit: 10 };
  if (page || size) {
    if (!page || page <= 0) page = 1;
    if (!size || size <= 0) size = 10;
    pagination.offset = size * (page - 1);
    pagination.limit = size;
  }

  // Min/Max LAT
  if (minLat && maxLat) {
    where.lat = { [Op.between]: [minLat, maxLat] };
  } else if (minLat) {
    where.lat = { [Op.gte]: minLat };
  } else if (maxLat) where.lat = { [Op.lte]: maxLat };

  // Min/Max LNG
  if (minLng && maxLng) {
    where.Lng = { [Op.between]: [minLng, maxLng] };
  } else if (minLng) {
    where.Lng = { [Op.gte]: minLng };
  } else if (maxLng) where.Lng = { [Op.lte]: maxLng };

  // Min/Max Price
  if (minPrice && maxPrice) {
    where.Price = { [Op.between]: [minPrice, maxPrice] };
  } else if (minPrice) {
    where.Price = { [Op.gte]: minPrice };
  } else if (maxPrice) where.Price = { [Op.lte]: maxPrice };

  const spots = await Spot.scope({
    method: [
      "getAllSpots",
      where,
      attributes,
      { group: "spot.id", subQuery: false, ...pagination },
    ],
  }).findAll();

  setPreview(spots);

  res.json({ spots, page: +page || 1, size: +size || 10 });
});

router.post("/", requireAuth, validateSpot, async (req, res, next) => {
  const ownerId = req.user.dataValues.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const newSpot = await Spot.create({
    ownerId,
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

  res.json(newSpot);
});

module.exports = router;
