"use strict";
const { Model } = require("sequelize");
const review = require("./review");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Review, {
        foreignKey: "reviewId",
      });
      Booking.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Booking.belongsTo(models.Spot, {
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
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfter: new Date().toISOString().split("T")[0],
          isPastEndDate(value) {
            if (value >= this.endDate) {
              throw new Error("Start Date must be before End Date");
            }
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfterStartDate(value) {
            if (value <= this.startDate) {
              throw new Error("End Date must be after Start Date.");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Booking",
      scopes: {
        getAllBookings(where, attributes, extras, task) {
          const { Image, User, Spot } = require("../models");
        },
      },
    }
  );
  return Booking;
};
