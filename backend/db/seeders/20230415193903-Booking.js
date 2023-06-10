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
        //patrick -> spongebob
        userId: 3,
        spotId: 1,
        reviewId: 1,
        startDate: new Date("2023-2-10"),
        endDate: new Date("2023-2-11"),
      },
      {
        //patrick -> squidward
        userId: 3,
        spotId: 3,
        reviewId: 2,
        startDate: new Date("2023-2-10"),
        endDate: new Date("2023-2-11"),
      },
      {
        //patrick -> sandy
        userId: 3,
        spotId: 4,
        reviewId: 3,
        startDate: new Date("2023-2-10"),
        endDate: new Date("2023-2-11"),
      },
      {
        //patrick -> krabs
        userId: 3,
        spotId: 5,
        reviewId: 4,
        startDate: new Date("2023-2-10"),
        endDate: new Date("2023-2-11"),
      },
      {
        //patrick -> plankton
        userId: 3,
        spotId: 6,
        reviewId: 5,
        startDate: new Date("2023-2-10"),
        endDate: new Date("2023-2-11"),
      },
      {
        //patrick -> dutchman
        userId: 3,
        spotId: 7,
        reviewId: 6,
        startDate: new Date("2023-2-10"),
        endDate: new Date("2023-2-11"),
      },
      {
        //patick -> sand home
        userId: 3,
        spotId: 8,
        reviewId: 7,
        startDate: new Date("2023-2-10"),
        endDate: new Date("2023-2-11"),
      },
      {
        //patrick -> shoals
        userId: 3,
        spotId: 9,
        reviewId: 8,
        startDate: new Date("2023-2-10"),
        endDate: new Date("2023-2-11"),
      },
      {
        //spongebob -> patrick
        userId: 2,
        spotId: 2,
        reviewId: 9,
        startDate: new Date("2023-2-12"),
        endDate: new Date("2023-2-13"),
      },
      {
        //spongebob -> squidward
        userId: 2,
        spotId: 3,
        reviewId: 10,
        startDate: new Date("2023-2-12"),
        endDate: new Date("2023-2-13"),
      },
      {
        //spongebob -> sandy
        userId: 2,
        spotId: 4,
        reviewId: 11,
        startDate: new Date("2023-2-12"),
        endDate: new Date("2023-2-13"),
      },
      {
        //spongebob -> krabs
        userId: 2,
        spotId: 5,
        reviewId: 12,
        startDate: new Date("2023-2-12"),
        endDate: new Date("2023-2-13"),
      },
      {
        //spongebob -> plankton
        userId: 2,
        spotId: 6,
        reviewId: 13,
        startDate: new Date("2023-2-12"),
        endDate: new Date("2023-2-13"),
      },
      {
        //spongebob -> dutchman
        userId: 2,
        spotId: 7,
        reviewId: 14,
        startDate: new Date("2023-2-12"),
        endDate: new Date("2023-2-13"),
      },
      {
        //spongebob -> sand home
        userId: 2,
        spotId: 8,
        reviewId: 15,
        startDate: new Date("2023-2-12"),
        endDate: new Date("2023-2-13"),
      },
      {
        //spongebob -> shoals
        userId: 2,
        spotId: 9,
        reviewId: 16,
        startDate: new Date("2023-2-12"),
        endDate: new Date("2023-2-13"),
      },
      {
        //squidward -> spongbob
        userId: 4,
        spotId: 1,
        reviewId: 17,
        startDate: new Date("2023-2-14"),
        endDate: new Date("2023-2-15"),
      },
      {
        //squidward -> patrick
        userId: 4,
        spotId: 2,
        reviewId: 18,
        startDate: new Date("2023-2-14"),
        endDate: new Date("2023-2-15"),
      },
      {
        //squidward -> sandy
        userId: 4,
        spotId: 4,
        reviewId: 19,
        startDate: new Date("2023-2-14"),
        endDate: new Date("2023-2-15"),
      },
      {
        //squidward -> krabs
        userId: 4,
        spotId: 5,
        reviewId: 20,
        startDate: new Date("2023-2-14"),
        endDate: new Date("2023-2-15"),
      },
      {
        //squidward -> plankton
        userId: 4,
        spotId: 6,
        reviewId: 21,
        startDate: new Date("2023-2-14"),
        endDate: new Date("2023-2-15"),
      },
      {
        //squidward -> dutchman
        userId: 4,
        spotId: 7,
        reviewId: 22,
        startDate: new Date("2023-2-14"),
        endDate: new Date("2023-2-15"),
      },
      {
        //squidward -> sand home
        userId: 4,
        spotId: 8,
        reviewId: 23,
        startDate: new Date("2023-2-14"),
        endDate: new Date("2023-2-15"),
      },
      {
        //squidward -> shoals
        userId: 4,
        spotId: 9,
        reviewId: 24,
        startDate: new Date("2023-2-14"),
        endDate: new Date("2023-2-15"),
      },
      {
        //sandy -> spongebob
        userId: 5,
        spotId: 1,
        reviewId: 25,
        startDate: new Date("2023-2-16"),
        endDate: new Date("2023-2-17"),
      },
      {
        //sandy -> patrick
        userId: 5,
        spotId: 2,
        reviewId: 26,
        startDate: new Date("2023-2-16"),
        endDate: new Date("2023-2-17"),
      },
      {
        //sandy -> squidward
        userId: 5,
        spotId: 3,
        reviewId: 27,
        startDate: new Date("2023-2-16"),
        endDate: new Date("2023-2-17"),
      },
      {
        //sandy -> krabs
        userId: 5,
        spotId: 5,
        reviewId: 28,
        startDate: new Date("2023-2-16"),
        endDate: new Date("2023-2-17"),
      },
      {
        //sandy -> plankton
        userId: 5,
        spotId: 6,
        reviewId: 29,
        startDate: new Date("2023-2-16"),
        endDate: new Date("2023-2-17"),
      },
      {
        //sandy -> dutchman
        userId: 5,
        spotId: 7,
        reviewId: 30,
        startDate: new Date("2023-2-16"),
        endDate: new Date("2023-2-17"),
      },
      {
        //sandy -> sand home
        userId: 5,
        spotId: 8,
        reviewId: 31,
        startDate: new Date("2023-2-16"),
        endDate: new Date("2023-2-17"),
      },
      {
        //sandy -> shoals
        userId: 5,
        spotId: 9,
        reviewId: 32,
        startDate: new Date("2023-2-16"),
        endDate: new Date("2023-2-17"),
      },
      {
        //krabs -> spongebob
        userId: 6,
        spotId: 1,
        reviewId: 33,
        startDate: new Date("2023-2-18"),
        endDate: new Date("2023-2-19"),
      },
      {
        //krabs -> patrick
        userId: 6,
        spotId: 2,
        reviewId: 34,
        startDate: new Date("2023-2-18"),
        endDate: new Date("2023-2-19"),
      },
      {
        //krabs -> squidward
        userId: 6,
        spotId: 3,
        reviewId: 35,
        startDate: new Date("2023-2-18"),
        endDate: new Date("2023-2-19"),
      },
      {
        //krabs -> sandy
        userId: 6,
        spotId: 4,
        reviewId: 36,
        startDate: new Date("2023-2-18"),
        endDate: new Date("2023-2-19"),
      },
      {
        //krabs -> plankton
        userId: 6,
        spotId: 6,
        reviewId: 37,
        startDate: new Date("2023-2-18"),
        endDate: new Date("2023-2-19"),
      },
      {
        //krabs -> dutchman
        userId: 6,
        spotId: 7,
        reviewId: 38,
        startDate: new Date("2023-2-18"),
        endDate: new Date("2023-2-19"),
      },
      {
        //krabs -> sand home
        userId: 6,
        spotId: 8,
        reviewId: 39,
        startDate: new Date("2023-2-18"),
        endDate: new Date("2023-2-19"),
      },
      {
        //krabs -> shoals
        userId: 6,
        spotId: 9,
        reviewId: 40,
        startDate: new Date("2023-2-18"),
        endDate: new Date("2023-2-19"),
      },
      {
        //plankton -> spongebob
        userId: 7,
        spotId: 1,
        reviewId: 41,
        startDate: new Date("2023-2-19"),
        endDate: new Date("2023-2-20"),
      },
      {
        //plankton -> patrick
        userId: 7,
        spotId: 2,
        reviewId: 42,
        startDate: new Date("2023-2-19"),
        endDate: new Date("2023-2-20"),
      },
      {
        //plankton -> squidward
        userId: 7,
        spotId: 3,
        reviewId: 43,
        startDate: new Date("2023-2-19"),
        endDate: new Date("2023-2-20"),
      },
      {
        //plankton -> sandy
        userId: 7,
        spotId: 4,
        reviewId: 44,
        startDate: new Date("2023-2-19"),
        endDate: new Date("2023-2-20"),
      },
      {
        //plankton -> krabs
        userId: 7,
        spotId: 5,
        reviewId: 45,
        startDate: new Date("2023-2-19"),
        endDate: new Date("2023-2-20"),
      },
      {
        //plankton -> dutchman
        userId: 7,
        spotId: 7,
        reviewId: 46,
        startDate: new Date("2023-2-19"),
        endDate: new Date("2023-2-20"),
      },
      {
        //plankton -> sand home
        userId: 7,
        spotId: 8,
        reviewId: 47,
        startDate: new Date("2023-2-19"),
        endDate: new Date("2023-2-20"),
      },
      {
        //plankton -> shoals
        userId: 7,
        spotId: 9,
        reviewId: 48,
        startDate: new Date("2023-2-19"),
        endDate: new Date("2023-2-20"),
      },
      {
        //dutchman -> spongebob
        userId: 8,
        spotId: 1,
        reviewId: 49,
        startDate: new Date("2023-2-21"),
        endDate: new Date("2023-2-22"),
      },
      {
        //dutchman -> patrick
        userId: 8,
        spotId: 2,
        reviewId: 50,
        startDate: new Date("2023-2-21"),
        endDate: new Date("2023-2-22"),
      },
      {
        //dutchman -> squidward
        userId: 8,
        spotId: 3,
        reviewId: 51,
        startDate: new Date("2023-2-21"),
        endDate: new Date("2023-2-22"),
      },
      {
        //dutchman -> sandy
        userId: 8,
        spotId: 4,
        reviewId: 52,
        startDate: new Date("2023-2-21"),
        endDate: new Date("2023-2-22"),
      },
      {
        //dutchman -> krabs
        userId: 8,
        spotId: 5,
        reviewId: 53,
        startDate: new Date("2023-2-21"),
        endDate: new Date("2023-2-22"),
      },
      {
        //dutchman -> plankton
        userId: 8,
        spotId: 6,
        reviewId: 54,
        startDate: new Date("2023-2-21"),
        endDate: new Date("2023-2-22"),
      },
      {
        //dutchman -> sand home
        userId: 8,
        spotId: 8,
        reviewId: 55,
        startDate: new Date("2023-2-21"),
        endDate: new Date("2023-2-22"),
      },
      {
        //dutchman -> shoals
        userId: 8,
        spotId: 9,
        reviewId: 56,
        startDate: new Date("2023-2-21"),
        endDate: new Date("2023-2-22"),
      },
      {
        //demo -> spongebob
        userId: 1,
        spotId: 1,
        reviewId: null,
        startDate: new Date("2023-2-23"),
        endDate: new Date("2023-2-24"),
      },
      {
        //demo -> patrick
        userId: 1,
        spotId: 2,
        reviewId: null,
        startDate: new Date("2023-2-23"),
        endDate: new Date("2023-2-24"),
      },
      {
        //demo -> squidward
        userId: 1,
        spotId: 3,
        reviewId: null,
        startDate: new Date("2023-2-23"),
        endDate: new Date("2023-2-24"),
      },
      {
        //demo -> sandy
        userId: 1,
        spotId: 4,
        reviewId: null,
        startDate: new Date("2023-2-23"),
        endDate: new Date("2023-2-24"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, null, {});
  },
};
