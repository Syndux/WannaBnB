'use strict';

const { Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          startDate: "",
          endDate: "",
          userId: "",
          spotId: ""
        },
        {
          startDate: "",
          endDate: "",
          userId: "",
          spotId: ""
        },
        {
          startDate: "",
          endDate: "",
          userId: "",
          spotId: ""
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(
      options,
      {

      },
      {}
    );
  },
};
