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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      startDate: {
        type: DataTypes.Date,
        allowNull: false,
        validate: {
          isAfter: "2023-01-01",
        },
      },
      endDate: {
        type: DataTypes.DATE,
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
