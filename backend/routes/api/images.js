const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { validateBookingBody } = require("../../utils/validation");
const { User, Booking, Spot, Review, Image, sequelize } = require("../../db/models");
const { route } = require("./reviews");

const router = express.Router();

module.exports = router;