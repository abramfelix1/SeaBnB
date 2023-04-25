const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { setTokenCookie } = require("../../utils/auth");
const { User } = require("../../db/models");

const { validateLogin } = require("../../utils/validation");

const router = express.Router();

/* Log in */
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential,
      },
    },
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Login failed");
    err.status = 403;
    err.title = "Login failed";
    err.errors = { credential: "The provided credentials were invalid." };
    return next(err);
  }

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

/* Log out */
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

/* Restore session user */
router.get("/", (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    // Get token
    let token = req.headers.cookie
      .split(";")
      .find((el) => el.includes("token"))
      .split("=")[1];

    safeUser.token = token;

    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});

module.exports = router;
