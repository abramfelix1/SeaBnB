const { validationResult } = require("express-validator");
const { check, query } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.param] = error.msg));

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 16 })
    .withMessage("Please provide a First Name between 1-16 characters"),
  check("lastName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 16 })
    .withMessage("Please provide a Last Name between 1-16 characters"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isAlphanumeric()
    .withMessage("Please provide a valid username")
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

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
    .withMessage("Please provide a city")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Please provide a valid city"),
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
    .optional()
    .if((value, { req }) => req.body.lat !== "" && req.body.lat !== null)
    .notEmpty()
    .isDecimal()
    .withMessage("Please provide a valid lat"),
  check("lng")
    .optional()
    .if((value, { req }) => req.body.lng !== "" && req.body.lng !== null)
    .notEmpty()
    .isDecimal()
    .withMessage("Please provide a valid lng"),
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
    .withMessage("Please provide a description")
    .isLength({ min: 30 })
    .withMessage("Description must have a minimum length of 30 characters"),
  check("price")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a price")
    .isDecimal()
    .withMessage("Please provide a valid price"),
  handleValidationErrors,
];

const validateImage = [
  check("url")
    .isURL()
    .withMessage("AAAAAAAAAA")
    .custom((value) => {
      if (!value) {
        throw new Error("Please provide at least one valid URL");
      }
      if (!/\.(png|jpe?g)$/.test(value)) {
        console.log("AAA " + value);
        throw new Error("URLs must end with a .png, .jpg, or .jpeg");
      }
      return true;
    }),
  check("preview").optional({ checkFalsy: true }),
  handleValidationErrors,
];

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide review text"),
  check("stars")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please give a rating")
    .isNumeric()
    .withMessage("Please give a valid rating")
    .isInt({ min: 0, max: 5 })
    .withMessage("Please provide a rating"),
  handleValidationErrors,
];

const validateBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a start date")
    .isDate()
    .withMessage("Please provide a valid date")
    .isAfter(new Date().toISOString().split("T")[0])
    .withMessage("Please provide a valid start date"),
  check("endDate")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a start end date")
    .isDate()
    .withMessage("Please provide a valid end date"),
  handleValidationErrors,
];

const validateQueries = [
  query("page")
    .optional({ checkFalsy: true })
    .isInt({ min: 0, max: 10 })
    .withMessage("Page must be between 0 and 10"),
  query("size")
    .optional({ checkFalsy: true })
    .isInt({ min: 0, max: 20 })
    .withMessage("Size must be between 0 and 20"),
  query("maxLat")
    .optional({ checkFalsy: true })
    .isDecimal()
    .withMessage("Maximum latitude is invalid"),
  query("minLat")
    .optional({ checkFalsy: true })
    .isDecimal()
    .withMessage("Minimum latitude is invalid"),
  query("maxLng")
    .optional({ checkFalsy: true })
    .isDecimal()
    .withMessage("Maximum longitude is invalid"),
  query("minLng")
    .optional({ checkFalsy: true })
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  query("maxPrice")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  query("minPrice")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateSpot,
  validateLogin,
  validateSignup,
  validateImage,
  validateReview,
  validateBooking,
  validateQueries,
};
