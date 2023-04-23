// backend/routes/api/spots.js
const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { validateSpotBody } = require("../../utils/validation");
const { User, Booking, Spot, Review, Image, sequelize } = require("../../db/models");

const router = express.Router();

// Get spots of current user
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

  return res.json({ Spots: ownedSpots });
});

// Add Image to a spot
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { spotId } = req.params;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return next({
      status: 404,
      message: "Spot couldn't be found",
    });
  }

  if (user.id !== spot.ownerId) {
    const err = new Error("Authorization required");
    err.status = 403;
    err.title = "Authorization required";
    err.errors = ["User does not have the correct permissions"];
    return next(err);
  }

  const newSpotImage = await Image.create({
    url,
    preview,
    imageableId: spotId,
    imageableType: "Spot",
  });

  return res.json({
    id: newSpotImage.id,
    url: newSpotImage.url,
    preview: newSpotImage.preview,
  });
});

// Get spot by id
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
    return res.json(spot);
  } else {
    return next({
      status: 404,
      message: "Spot couldn't be found",
    });
  }
});

// Edit spot by id
router.put("/:id", requireAuth, validateSpotBody, async (req, res, next) => {
  const { user } = req;
  const spotId = req.params.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spot = await Spot.findByPk(spotId);
  
  if (!spot) {
    return next({
      status: 404,
      message: "Spot couldn't be found",
    });
  }

  if (user.id !== spot.ownerId) {
    const err = new Error("Authorization required");
    err.status = 403;
    err.title = "Authorization required";
    err.errors = ["User does not have the correct permissions"];
    return next(err);
  }

  const updatedSpot = await spot.update({
    address, city, state, country, lat, lng, name, description, price
  });

  return res.json(updatedSpot);
});

// Delete spot by id
router.delete("/:id", requireAuth, async (req, res, next) => {
  const { user } = req;
  const spotId = req.params.id;

  const spot = await Spot.findByPk(spotId);
  
  if (!spot) {
    return next({
      status: 404,
      message: "Spot couldn't be found",
    });
  }

  if (user.id !== spot.ownerId) {
    const err = new Error("Authorization required");
    err.status = 403;
    err.title = "Authorization required";
    err.errors = ["User does not have the correct permissions"];
    return next(err);
  }

  await spot.destroy();

  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  });
});

// Get all spots
router.get("", async (_req, res) => {
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

  return res.json({ Spots: spots });
});

// Add new spot
router.post("", requireAuth, validateSpotBody, async (req, res, next) => {
  try {
    const { address, city, state, country, lat, lng, name, description, price } =
      req.body;

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

    return res.json(newSpot);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
