"use strict";
const { Model, TEXT } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
      });
      Spot.hasMany(models.Image, {
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "Spot",
        },
      });
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
      });
    }
  }
  Spot.init(
    {
      ownerId: {
        DataTypes: INTEGER,
        allowNull: false,
      },
      address: {
        DataTypes: STRING,
        allowNull: false,
      },
      city: {
        DataTypes: STRING,
        allowNull: false,
      },
      country: {
        DataTypes: STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lat: {
        DataTypes: DECIMAL,
        allowNull: true,
      },
      lng: {
        DataTypes: DECIMAL,
        allowNull: true,
      },
      name: {
        DataTypes: STRING,
        allowNull: false,
        validate: {
          len: [4, 50],
        },
      },
      description: {
        DataTypes: TEXT,
        allowNull: false,
      },
      price: {
        DataTypes: DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
