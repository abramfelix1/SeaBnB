"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Image";
    return queryInterface.bulkInsert(options, [
      {
        imageableId: 1,
        imageableType: "Spot",
        url: "https://i.imgur.com/DCyhd6X.png",
        preview: true,
      },
      {
        imageableId: 2,
        imageableType: "Spot",
        url: "https://i.imgur.com/DCyhd6X.png",
        preview: true,
      },
      {
        imageableId: 3,
        imageableType: "Spot",
        url: "https://i.imgur.com/DCyhd6X.png",
        preview: true,
      },
      {
        imageableId: 1,
        imageableType: "Review",
        url: "https://i.imgur.com/DCyhd6X.png",
        preview: true,
      },
      {
        imageableId: 2,
        imageableType: "Review",
        url: "https://i.imgur.com/DCyhd6X.png",
        preview: true,
      },
      {
        imageableId: 3,
        imageableType: "Review",
        url: "https://i.imgur.com/DCyhd6X.png",
        preview: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Image";
    return queryInterface.bulkDelete(options, null, {});
  },
};
