const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

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

/* Sign up */
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  // Check if Username or Email exists
  const usernameExists = await User.findOne({ where: { username } });
  const emailExists = await User.findOne({ where: { email } });

  if (usernameExists) {
    return res.status(403).json({
      message: "User already exists",
      statusCode: "403",
      errors: {
        user: "User with that username already exists",
      },
    });
  }
  if (emailExists) {
    return res.status(403).json({
      message: "User already exists",
      statusCode: "403",
      errors: {
        user: "User with that email already exists",
      },
    });
  }

  const user = await User.create({
    email,
    username,
    hashedPassword,
    firstName,
    lastName,
  });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  // Get and Set token
  const token = await setTokenCookie(res, safeUser);
  safeUser.token = token;

  return res.json({
    user: safeUser,
  });
});

module.exports = router;
