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
        startDate: new Date("2024-12-11"),
        endDate: new Date("2024-12-12"),
      },
      {
        userId: 1,
        spotId: 2,
        reviewId: 2,
        startDate: new Date("2024-12-11"),
        endDate: new Date("2024-12-12"),
      },
      {
        userId: 1,
        spotId: 2,
        reviewId: 3,
        startDate: new Date("2024-12-11"),
        endDate: new Date("2024-12-12"),
      },
      {
        userId: 1,
        spotId: 2,
        reviewId: 4,
        startDate: new Date("2024-12-11"),
        endDate: new Date("2024-12-12"),
      },
      {
        userId: 1,
        spotId: 2,
        reviewId: 5,
        startDate: new Date("2024-12-11"),
        endDate: new Date("2024-12-12"),
      },
      {
        userId: 1,
        spotId: 2,
        reviewId: 6,
        startDate: new Date("2024-12-11"),
        endDate: new Date("2024-12-12"),
      },
      {
        userId: 2,
        spotId: 3,
        reviewId: 7,
        startDate: new Date("2025-12-11"),
        endDate: new Date("2025-12-12"),
      },
      {
        userId: 3,
        spotId: 1,
        reviewId: 8,
        startDate: new Date("2026-12-11"),
        endDate: new Date("2026-12-12"),
      },
      {
        userId: 1,
        spotId: 3,
        reviewId: 9,
        startDate: new Date("2024-12-11"),
        endDate: new Date("2024-12-12"),
      },
      {
        userId: 2,
        spotId: 1,
        reviewId: 10,
        startDate: new Date("2025-11-12"),
        endDate: new Date("2025-12-12"),
      },
      {
        userId: 3,
        spotId: 2,
        reviewId: 11,
        startDate: new Date("2026-12-11"),
        endDate: new Date("2026-12-12"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, null, {});
  },
};
