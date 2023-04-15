// backend/routes/api/users.js
const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

// Get current user
router.get('/current', async (req, res) => {
  const { user } = req;

  if(user) {
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username
    };
    
    return res.json({ user: safeUser });
  } else return res.json({ user: null });
});

module.exports = router;
