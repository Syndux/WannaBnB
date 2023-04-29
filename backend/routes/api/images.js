const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { validateBookingBody } = require("../../utils/validation");
const { User, Booking, Spot, Review, Image, sequelize } = require("../../db/models");

const router = express.Router();

// Delete spot image
router.delete("/:id", requireAuth, async (req, res, next) => {
  const { id } = req.params;
  const userId = +req.user.id;
  
  const image = await Image.findByPk(id, {
    include: {
      model: Spot,
      attributes: ["ownerId"],
    }
  });

  if(!image) {
    return next({
      status: 404,
      message: "Spot Image couldn't be found",
    });
  }

  if(userId !== image.Spot.ownerId) {
    const err = new Error("Authorization required");
    err.status = 403;
    err.message = "Forbidden";
    return next(err);
  }

  await image.destroy();

  return res.json({
    status: 200,
    message: "Successfully deleted",
  });
});

module.exports = router;