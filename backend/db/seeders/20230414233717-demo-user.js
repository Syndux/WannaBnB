"use strict";
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          firstName: "Demo",
          lastName: "User",
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "User2",
          lastName: "Test",
          email: "user2@user.io",
          username: "User2Test",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "User3",
          lastName: "Test",
          email: "user3@user.io",
          username: "User3Test",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "User4",
          lastName: "Test",
          email: "user4@user.io",
          username: "User4Test",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "User5",
          lastName: "Test",
          email: "user5@user.io",
          username: "User5Test",
          hashedPassword: bcrypt.hashSync("password5"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
