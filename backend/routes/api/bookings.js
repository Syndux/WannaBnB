const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { validateReviewBody } = require("../../utils/validation");
const { User, Booking, Spot, Review, Image, sequelize } = require("../../db/models");

const router = express.Router();

router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;

  const bookings = await Booking.findAll({
    where: { userId },
    include: {
      model: Spot,
      attributes: {
        exclude: ["description", "createdAt", "updatedAt"],
      },
      include: {
        model: Image,
        where: { preview: true },
        attributes: [],
      },
    },
  });

  for (const booking of bookings) {
    booking.dataValues.startDate = booking.startDate.toISOString().substring(0, 10);
    booking.dataValues.endDate = booking.endDate.toISOString().substring(0, 10);

    booking.dataValues.createdAt = booking.createdAt.toISOString().replace("T", " ").substring(0, 19);
    booking.dataValues.updatedAt = booking.updatedAt.toISOString().replace("T", " ").substring(0, 19);

    const spotPreviewImage = await Image.findOne({
      where: { imageableId: booking.Spot.id, imageableType: "Spot", preview: true },
      attributes: ["url"],
    });

    booking.Spot.dataValues.previewImage = spotPreviewImage
      ? spotPreviewImage.url
      : null;
  }

  return res.json({ Bookings: bookings });
});

module.exports = router;
