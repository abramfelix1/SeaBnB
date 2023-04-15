"use strict";
const { Model } = require("sequelize");
const review = require("./review");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.hasOne(models.Review, {
        foreignKey: "reviewId",
      });
      Booking.belongsTo(models.Users, {
        foreignKey: "userId",
      });
      Booking.belongsTo(models.Spots, {
        foreignKey: "spotId",
      });
    }
  }
  Booking.init(
    {
      userId: {
        DataTypes: INTEGER,
        allowNull: false,
      },
      spotId: {
        DataTypes: INTEGER,
        allowNull: false,
      },
      reviewId: {
        DataTypes: INTEGER,
        allowNull: true,
      },
      startDate: {
        DataTypes: DATE,
        allowNull: false,
        validate: {
          isAfter: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      endDate: {
        DataTypes: DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
