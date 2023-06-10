"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Images";
    return queryInterface.bulkInsert(options, [
      {
        imageableId: 1,
        imageableType: "Spot",
        url: "https://i.imgur.com/b9xDyQg.png",
        preview: true,
      },
      {
        imageableId: 1,
        imageableType: "Spot",
        url: "https://i.imgur.com/MNaBJzI.png",
        preview: false,
      },
      {
        imageableId: 1,
        imageableType: "Spot",
        url: "https://i.imgur.com/cHoPG7i.png",
        preview: false,
      },
      {
        imageableId: 1,
        imageableType: "Spot",
        url: "https://i.imgur.com/0A45ZpY.png",
        preview: false,
      },
      {
        imageableId: 1,
        imageableType: "Spot",
        url: "https://i.imgur.com/VRcevRW.png",
        preview: false,
      },
      {
        imageableId: 2,
        imageableType: "Spot",
        url: "https://i.imgur.com/aeE6CTg.png",
        preview: true,
      },
      {
        imageableId: 2,
        imageableType: "Spot",
        url: "https://i.imgur.com/Y97fAHB.png",
        preview: false,
      },
      {
        imageableId: 3,
        imageableType: "Spot",
        url: "https://i.imgur.com/JgMZXF3.png",
        preview: true,
      },
      {
        imageableId: 3,
        imageableType: "Spot",
        url: "https://i.imgur.com/E4reny7.png",
        preview: false,
      },
      {
        imageableId: 3,
        imageableType: "Spot",
        url: "https://i.imgur.com/H0XRoAS.png",
        preview: false,
      },
      {
        imageableId: 4,
        imageableType: "Spot",
        url: "https://i.imgur.com/kJ9LI47.png",
        preview: true,
      },
      {
        imageableId: 4,
        imageableType: "Spot",
        url: "https://i.imgur.com/VUyjYLA.png",
        preview: false,
      },
      {
        imageableId: 4,
        imageableType: "Spot",
        url: "https://i.imgur.com/72LJdoS.png",
        preview: false,
      },
      {
        imageableId: 4,
        imageableType: "Spot",
        url: "https://i.imgur.com/sqMWuy5.png",
        preview: false,
      },
      {
        imageableId: 5,
        imageableType: "Spot",
        url: "https://i.imgur.com/6ANBzR1.png",
        preview: true,
      },
      {
        imageableId: 6,
        imageableType: "Spot",
        url: "https://i.imgur.com/jiyWoAs.png",
        preview: true,
      },
      {
        imageableId: 7,
        imageableType: "Spot",
        url: "https://i.imgur.com/TZC1U29.png",
        preview: true,
      },
      {
        imageableId: 8,
        imageableType: "Spot",
        url: "https://i.imgur.com/vEwPgxc.png",
        preview: true,
      },
      {
        imageableId: 9,
        imageableType: "Spot",
        url: "https://i.imgur.com/Dmcd95C.png",
        preview: true,
      },
      {
        imageableId: 10,
        imageableType: "Spot",
        url: "https://i.imgur.com/Ci3nq38.png",
        preview: true,
      },
      {
        imageableId: 11,
        imageableType: "Spot",
        url: "https://i.imgur.com/d6dHRLi.png",
        preview: true,
      },
      {
        imageableId: 12,
        imageableType: "Spot",
        url: "https://i.imgur.com/kDiNn3D.png",
        preview: true,
      },
      {
        imageableId: 13,
        imageableType: "Spot",
        url: "https://i.imgur.com/NmSIJQt.png",
        preview: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Images";
    return queryInterface.bulkDelete(options, null, {});
  },
};
