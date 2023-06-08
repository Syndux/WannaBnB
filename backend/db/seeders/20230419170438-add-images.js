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
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/da26a96a-a642-48c0-89a2-2ee1f4932cdc/Swiss+Interior+Grandeur+Park+Shan-9464.png?format=1500w",
          preview: false,
          imageableId: 1,
          imageableType: "Spot",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/1655208861626-MUZ45I4J4JDX4BMUZWEW/Swiss+Interior+Grandeur+Park+Shan-9484.png?format=1500w",
          preview: true,
          imageableId: 1,
          imageableType: "Spot",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/1627798150395-EANP0XZ7QNGZBNJABZ4N/Tampines%2B4-Room%2BHDB%2BBTO%2BBedroom%2B1.jpeg?format=1500w",
          preview: false,
          imageableId: 2,
          imageableType: "Spot",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/1661159419900-44SNRH35ZXUF4EZKN3UD/Tampines%2B4-Room%2BHDB%2BBTO%2BLiving%2BRoom%2B1.jpg?format=1000w",
          preview: true,
          imageableId: 2,
          imageableType: "Spot",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/42e6001e-dd49-403b-b0cd-9dd390307262/Fairmont%2C+4+Bedder+Condominium+Kitchen+9.jpg?format=500w",
          preview: false,
          imageableId: 3,
          imageableType: "Spot",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/5d62c704-02ed-4ae7-9501-bea433811deb/Swiss+Kent+Bedok-0154.png?format=1500w",
          preview: true,
          imageableId: 3,
          imageableType: "Spot",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/1593438791070-1G65M9ZG9HH37W2KUREA/Blk%2B663B%2BPunggol%2BDrive%2B-%2B5-Room%2BBTO%2B%287%2Bof%2B8%29.jpg?format=1500w",
          preview: false,
          imageableId: 1,
          imageableType: "Review",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/1614703087956-VJRUHRC3K23E73K9266H/Blk%2B663B%2BPunggol%2BDrive%2B-%2B5-Room%2BBTO%2B%281%2Bof%2B8%29.jpg?format=1000w",
          preview: true,
          imageableId: 1,
          imageableType: "Review",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/46fb2917-a316-47b4-b430-ee33fc61dd14/413C+Northshore+Drive%2C+4+Room+BTO+Flat+Study+Area+2.jpg?format=1500w",
          preview: false,
          imageableId: 2,
          imageableType: "Review",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/b73339e4-f0c6-43c5-b4ab-2e04ce77f35e/413C%2BNorthshore%2BDrive%2C%2B4Room%2BBTO%2BFlat%2BLiving%2BRoom%2B5.jpeg?format=1000w",
          preview: true,
          imageableId: 2,
          imageableType: "Review",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/1625637706535-EUD1ZWAVJU9R1305C8HV/Blk+313C+Sumang+Link+5Room+HDB+Resale+%2815%29.jpg?format=1500w",
          preview: false,
          imageableId: 3,
          imageableType: "Review",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/1635413252746-QD0NPL91813Z527GPSKA/Blk+313C+Sumang+Link+5Room+HDB+Resale%2B%289%29.jpeg?format=1500w",
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
