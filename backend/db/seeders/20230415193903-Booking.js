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
        spotId: 2,
        reviewId: 1,
        startDate: "2024-12-11",
        endDate: "2024-12-12",
      },
      {
        userId: 2,
        spotId: 3,
        reviewId: 2,
        startDate: "2025-12-11",
        endDate: "2025-12-12",
      },
      {
        userId: 3,
        spotId: 1,
        reviewId: 3,
        startDate: "2026-12-11",
        endDate: "2026-12-12",
      },
      {
        userId: 1,
        spotId: 3,
        reviewId: 4,
        startDate: "2024-12-11",
        endDate: "2024-12-12",
      },
      {
        userId: 2,
        spotId: 1,
        reviewId: 5,
        startDate: "2025-11-12",
        endDate: "2025-12-12",
      },
      {
        userId: 3,
        spotId: 2,
        reviewId: 6,
        startDate: "2026-12-11",
        endDate: "2026-12-12",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, null, {});
  },
};
