const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { User, Booking, Spot, Review, Image, sequelize } = require("../../db/models");

const router = express.Router();

router.get("/current", requireAuth, async (req, res, next) => {
  const userReviews = await Review.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        include: [
          {
            model: Image,
            attributes: [],
            where: { preview: true },
          },
        ],
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
      },
      {
        model: Image,
        attributes: ["id", "url"],
        as: "ReviewImages",
      },
    ],
  });

  for (const review of userReviews) {
    const spotPreviewImage = await Image.findOne({
      where: { imageableId: review.Spot.id, imageableType: "Spot", preview: true },
      attributes: ["url"],
    });

    spotPreviewImage
      ? (review.Spot.dataValues.previewImage = spotPreviewImage.url)
      : (review.Spot.dataValues.previewImage = null);
  }

  return res.json({ Reviews: userReviews });
});

module.exports = router;
