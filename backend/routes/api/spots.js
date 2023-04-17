const express = require("express");
const router = express.Router();

const { Spot, Image, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const sequelize = require("sequelize");

router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll({
    include: { model: Image, as: "previewImage", where: { preview: 1 } },
  });
  res.json(spots);
});

module.exports = router;
