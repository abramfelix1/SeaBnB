"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "user 1 address",
        city: "user 1 city",
        state: "user 1 state",
        country: "user 1 country",
        lat: 1.0,
        lng: 1.0,
        name: "user 1 spot name",
        description: "user 1 description",
        price: 1.0,
      },
      {
        ownerId: 2,
        address: "user 2 address",
        city: "user 2 city",
        state: "user 2 state",
        country: "user 2 country",
        lat: 2.0,
        lng: 2.0,
        name: "user 2 spot name",
        description: "user 2 description",
        price: 2.0,
      },
      {
        ownerId: 3,
        address: "user 3 address",
        city: "user 3 city",
        state: "user 3 state",
        country: "user 3 country",
        lat: 3.0,
        lng: 3.0,
        name: "user 3 spot name",
        description: "user 3 description",
        price: 3.0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  },
};
