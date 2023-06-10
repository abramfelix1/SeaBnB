"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          firstName: "Demo",
          lastName: "User",
          email: "demo@user.io",
          username: "Demo-lition",
          profileImg: null,
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Spongebob",
          lastName: "Squarepants",
          email: "spongebob@user.io",
          username: "SpongebobSP",
          profileImg: "https://i.imgur.com/gjUrmiY.png",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Patrick",
          lastName: "Star",
          email: "patrick@user.io",
          username: "PatrickS",
          profileImg: "https://i.imgur.com/NOyY0nM.png",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Squidward",
          lastName: "Tentacles",
          email: "squidward@user.io",
          username: "SquidwardT",
          profileImg: "https://i.imgur.com/bD7qrRn.png",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Sandy",
          lastName: "Cheeks",
          email: "sandy@user.io",
          username: "SandyC",
          profileImg: "https://i.imgur.com/hkcDp0W.png",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Eugene",
          lastName: "Krabs",
          email: "krabs@user.io",
          username: "EKrabs",
          profileImg: "https://i.imgur.com/Bm5UF3v.png",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Sheldon",
          lastName: "Plankton",
          email: "plankton@user.io",
          username: "SPlankton",
          profileImg: "https://i.imgur.com/L3kdtUe.png",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Dutchman",
          lastName: "Flying",
          email: "dutchman@user.io",
          username: "FDutchman",
          profileImg: "https://i.imgur.com/IepDxSq.png",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Random",
          lastName: "Fish",
          email: "fish@user.io",
          username: "Fish",
          profileImg: "https://i.imgur.com/1p8GwDA.png",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
