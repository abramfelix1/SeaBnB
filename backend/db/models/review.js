"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // define association here
      Review.hasOne(models.Booking, {
        foreignKey: "reviewId",
        as: "User",
      });
      Review.hasMany(models.Image, {
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "Review",
        },
      });
    }
  }
  Review.init(
    {
      review: { type: DataTypes.TEXT, allowNull: false },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 5,
          isNumeric: true,
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
      scopes: {
        getAllReviews(where) {
          const { Image, Booking, Review, User } = require("../models");
          return {
            include: [
              {
                model: Booking,
                as: "User",
                where,
                include: [{ model: User, attributes: [] }],
                attributes: [
                  "id",
                  [sequelize.literal('"User->User"."firstName"'), "firstName"],
                  [sequelize.literal('"User->User"."firstName"'), "lastName"],
                ],
              },
              {
                model: Image,
                attributes: ["id", "url"],
              },
            ],
            attributes: {
              include: [
                [sequelize.literal('"User"."userId"'), "userId"],
                [sequelize.literal('"User"."spotId"'), "spotId"],
              ],
            },
          };
        },
      },
    }
  );
  return Review;
};
