'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          review: 'Review 1 for Spot1 from User2',
          stars: 5,
          userId: 2,
          spotId: 1,
        },
        {
          review: 'Review 2 for Spot2 from User3',
          stars: 4,
          userId: 3,
          spotId: 2,
        },
        {
          review: 'Review 3 for Spot3 from Demo',
          stars: 3,
          userId: 1,
          spotId: 3,
        },
        {
          review: 'Review 4 for Spot1 from User3',
          stars: 1,
          userId: 3,
          spotId: 1,
        },
        {
          review: 'Review 5 for Spot1 from User4',
          stars: 2,
          userId: 4,
          spotId: 1,
        },
        {
          review: 'Review 6 for Spot1 from User5',
          stars: 5,
          userId: 5,
          spotId: 1,
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        id: { [Op.in]: ['1', '2', '3'] },
      },
      {}
    );
  },
};
