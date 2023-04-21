// backend/routes/api/spots.js
const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const {
  User,
  Booking,
  Spot,
  Review,
  Image,
  sequelize,
} = require("../../db/models");

const router = express.Router();

router.get("/owned", requireAuth, async (req, res) => {
  const ownedSpots = await Spot.findAll({
    where: { id: req.user.id },
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: Image,
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
        [sequelize.col("Images.url"), "previewImage"],
      ],
    },
  });

  res.json({ Spots: ownedSpots });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  const spot = await Spot.findByPk(id, {
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: Image,
        attributes: ['id', 'url', 'preview'],
        as: 'SpotImages'
      },
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName'],
        as: 'Owner'
      }
    ],
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
      ]
    },
    group: ["Spot.id"],
  });

  if(spot) {
    res.json(spot);
  } else {
    next({
      status: 404,
      message: "Spot couldn't be found",
    });
  }

});

router.get("", async (req, res) => {
  const spots = await Spot.findAll({
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: Image,
        attributes: [],
      },
    ],
    group: ["Spot.id"],
    attributes: {
      include: [
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
        [sequelize.col("Images.url"), "previewImage"],
      ],
    },
  });

  res.json({ Spots: spots });
});

router.post("", requireAuth, async (req, res) => {
  try{
    const { address, city, state, country, lat, lng, name, description, price} = req.body;
  
    const newSpot = await Spot.create({
      address, city, state, country, lat, lng, name, description, price
    });

    res.json(newSpot);
  } catch (err) {
    
  }


});

module.exports = router;
