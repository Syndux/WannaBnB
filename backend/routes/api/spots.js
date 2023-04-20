// backend/routes/api/spots.js
const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Spot, Review, Image, sequelize } = require("../../db/models");

const router = express.Router();

router.get("", async (req, res) => {
  const spots = await Spot.findAll({
    include: [
      {
        model: Review,
        attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],],
      },
      {
        model: Image,
        attributes: [],
      },
    ],
    group: ["Spot.id"],
    raw: true,
    attributes: {
      include: [
        ['Images.url', 'previewImage']
      ]
    }
  });

  res.json(spots);
});

module.exports = router;
