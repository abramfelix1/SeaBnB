"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        reviewId: 1,
        startDate: "12/12/2024",
        endDate: "12/12/2024",
      },
      {
        userId: 2,
        spotId: 2,
        reviewId: 2,
        startDate: "12/12/2025",
        endDate: "12/12/2025",
      },
      {
        userId: 3,
        spotId: 3,
        reviewId: 3,
        startDate: "12/12/2025",
        endDate: "12/12/2025",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, null, {});
  },
};
