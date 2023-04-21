const { validationResult } = require("express-validator");
const { check } = require("express-validator");

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

const validateImage = [
  check("url")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a URL")
    .isURL()
    .withMessage("Please provide a valid URL"),
  check("preview")
    .optional({ checkFalsy: true })
    .isIn(["true", "false"])
    .withMessage("Please provide true or false"),
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
    .withMessage("Please rate 0-5"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateSpot,
  validateLogin,
  validateSignup,
  validateImage,
  validateReview,
};
