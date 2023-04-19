const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { validateSignup } = require("../../utils/validation");

const router = express.Router();

/* Sign up */
router.post("/", validateSignup, async (req, res, next) => {
  const { email, password, username, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  // a

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
