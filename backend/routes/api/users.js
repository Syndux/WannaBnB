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

// Log In a User
router.post("/login", async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential,
      },
    },
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    err.title = "Invalid credentials";
    err.errors = { credential: "Invalid credentials" };
    return next(err);
  }

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  safeUser.token = await setTokenCookie(res, safeUser);
  
  return res.json({ user: safeUser });
});

// Signup
router.post('', async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    firstName,
    lastName,
    email,
    username,
    hashedPassword,
  });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  safeUser.token = await setTokenCookie(res, safeUser);

  return res.json({ user: safeUser });
});

module.exports = router;
