// backend/routes/api/spots.js
const express = require("express");
const { Op } = require("sequelize");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { validateSpotBody, validateReviewBody, validateBookingBody } = require("../../utils/validation");
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
        where: { preview: true },
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
    err.message = "Forbidden";
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

// Get reviews by spot id
router.get("/:id/reviews", async (req, res, next) => {
  const { id } = req.params;

  const reviews = await Review.findAll({
    where: { spotId: id },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Image,
        as: "ReviewImages",
        attributes: ["id", "url"],
      },
    ],
  });

  if (reviews.length) {
    return res.json({ Reviews: reviews });
  } else {
    return next({
      message: "Spot couldn't be found",
      status: 404,
    });
  }
});

// Create review for spot from id
router.post(
  "/:id/reviews",
  requireAuth,
  validateReviewBody,
  async (req, res, next) => {
    const { review, stars } = req.body;
    const spotId = +req.params.id;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return next({
        status: 404,
        message: "Spot couldn't be found",
      });
    }

    // user is owner of spot
    // if(spot.ownerId = userId) {
    //   return next({
    //     status: 404,
    //     message: "Owner can not write review for spot"
    //   })
    // }

    const oldReview = await Review.findAll({
      where: { userId, spotId },
    });

    if (oldReview.length) {
      return next({
        status: 403,
        message: "User already has a review for this spot",
      });
    }

    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars,
    });

    return res.status(201).json(newReview);
  }
);

// Get bookings by spot id
router.get("/:id/bookings", requireAuth, async (req, res, next) => {
  const spotId = req.params.id;
  const userId = req.user.id;
  const attributes = {};

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return next({
      status: 404,
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== userId) {
    attributes.attributes = { exclude: ["id", "userId", "createdAt", "updatedAt"] };
  } else {
    attributes.include = [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ];
  }

  console.log(attributes);

  const bookings = await Booking.findAll({
    where: { spotId },
    ...attributes,
  });

  return res.json({ Bookings: bookings });
});

// Create booking from spotId
router.post("/:id/bookings", requireAuth, validateBookingBody, async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const spotId = +req.params.id;
  const userId = req.user.id;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return next({
      status: 404,
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId === userId) {
    const err = new Error("Authorization required");
    err.status = 403;
    err.message = "Forbidden";
    return next(err);
  }

  const conflictBookings = await Booking.findAll({
    where: {
      spotId,
      [Op.or]: [
        {
          startDate: {
            [Op.between]: [
              `${new Date(startDate).toISOString()}`,
              `${new Date(endDate).toISOString()}`,
            ],
          },
        },
        {
          endDate: {
            [Op.between]: [
              `${new Date(startDate).toISOString()}`,
              `${new Date(endDate).toISOString()}`,
            ],
          },
        },
        {
          startDate: { [Op.lte]: startDate },
          endDate: { [Op.gte]: endDate },
        },
      ],
    },
  });

  if (conflictBookings.length > 0) {
    const errors = [];

    const booking = conflictBookings[0];

    const bookingStart = booking.startDate.toISOString().substring(0, 10);
    const bookingEnd = booking.endDate.toISOString().substring(0, 10);

    if (startDate >= bookingStart && startDate <= bookingEnd) {
      errors.push("Start date conflicts with an existing booking");
    }
    if (endDate >= bookingStart && endDate <= bookingEnd) {
      errors.push("End date conflicts with an existing booking");
    }
    if (startDate < bookingStart && endDate > bookingEnd) {
      errors.push("Booking conflicts with an existing booking");
    }

    return next({
      status: 403,
      message: "Sorry, this spot is already booked for the specified dates",
      errors,
    });
  }

  const newBooking = await Booking.create({
    spotId,
    userId,
    startDate,
    endDate,
  });

  return res.json({ newBooking });
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
    group: ["SpotImages.id"],
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
    err.message = "Forbidden";
    return next(err);
  }

  const updatedSpot = await spot.update({
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
    err.message = "Forbidden";
    return next(err);
  }

  await spot.destroy();

  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
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
        where: { preview: true },
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

    return res.status(201).json(newSpot);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
