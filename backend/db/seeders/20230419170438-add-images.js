"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Images";
    return queryInterface.bulkInsert(
      options,
      [
        {
          url: "https://imgur.com/a/wvnbq3v",
          preview: true,
          imageableId: 1,
          imageableType: "Spot",
        },
        {
          url: "https://imgur.com/wrUiHby",
          preview: true,
          imageableId: 2,
          imageableType: "Spot",
        },
        {
          url: "https://imgur.com/BYNiI0T",
          preview: true,
          imageableId: 3,
          imageableType: "Spot",
        },
        {
          url: "https://imgur.com/a/wvnbq3v",
          preview: true,
          imageableId: 1,
          imageableType: "Review",
        },
        {
          url: "https://imgur.com/wrUiHby",
          preview: true,
          imageableId: 2,
          imageableType: "Review",
        },
        {
          url: "https://imgur.com/a/wvnbq3v",
          preview: true,
          imageableId: 3,
          imageableType: "Review",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Images";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  },
};
