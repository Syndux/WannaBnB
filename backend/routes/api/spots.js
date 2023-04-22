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

const validateSpotCreation = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street addres is required"),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

router.get("/owned", requireAuth, async (req, res) => {
  const ownedSpots = await Spot.findAll({
    where: { ownerId: req.user.id },
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
    group: ["Spot.id"],
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
        attributes: ["id", "url", "preview"],
        as: "SpotImages",
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
        as: "Owner",
      },
    ],
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
      ],
    },
    group: ["Spot.id"],
  });

  if (spot) {
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

router.post("", requireAuth, validateSpotCreation, async (req, res, next) => {
  try {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    const { id } = req.user;
    const newSpot = await Spot.create({
      ownerId: id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    res.json(newSpot);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
