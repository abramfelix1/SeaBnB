const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const {} = require("../../utils/validation");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const {} = require("../../utils/helpers");

module.exports = router;
