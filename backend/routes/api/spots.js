const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide an address")
    .isAlphanumeric("en-US", { ignore: "/ ./i" })
    .withMessage("Please provide a valid address"),
  check("city")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a city"),
  check("country")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a country")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Please provide a valid country"),
  check("state")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a state")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Please provide a valid state"),
  check("lat")
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Please provide a valid lattitude"),
  check("lng")
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Please provide a valid longitude"),
  check("name")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a name")
    .isLength({ min: 4, max: 50 })
    .withMessage("Name must be between 4-50 characters")
    .isAlphanumeric("en-US", { ignore: "/ ,.()[]!/i" })
    .withMessage("Please provide a valid name"),
  check("description")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a description"),
  check("price")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a price")
    .isDecimal()
    .withMessage("Please provide a valid price"),
  handleValidationErrors,
];

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
    method: ["getAllSpots", where, attributes],
  }).findAll();

  if (spots[0].dataValues.id) {
    const url = spots[0].dataValues.previewImage[0].dataValues.url;

    spots[0].dataValues.previewImage
      ? (spots[0].dataValues.previewImage = url)
      : (spots[0].dataValues.previewImage = "Preview Image Unavailable");

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

  for (const i in spots) {
    const url = spots[i].dataValues.previewImage[0].dataValues.url;
    spots[i].dataValues.previewImage
      ? (spots[i].dataValues.previewImage = url)
      : (spots[i].dataValues.previewImage = "Preview Image Unavailable");
  }

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
  res.json([]);
});

module.exports = router;
