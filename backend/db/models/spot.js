"use strict";
const { Model, TEXT } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });

      Spot.hasMany(models.Image, {
        as: "previewImage",
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "Spot",
        },
        onDelete: "CASCADE",
      });

      Spot.hasMany(models.Image, {
        as: "images",
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "Spot",
        },
        onDelete: "CASCADE",
      });

      Spot.belongsTo(models.User, {
        as: "owner",
        foreignKey: "ownerId",
      });
    }
  }

  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 50],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Spot",
      scopes: {
        getAllSpots(where, attributes, extras, task) {
          const { Image, Booking, Review } = require("../models");
          const includeObjects = [
            {
              model: Image,
              as: "previewImage",
              where: { preview: true },
              attributes: ["url"],
              required: false,
            },
          ];

          if (task === "Spot") {
            includeObjects.push({
              model: Booking,
              include: [
                {
                  model: Review,
                  attributes: [],
                },
              ],
              attributes: [
                [
                  sequelize.fn("COUNT", sequelize.col("Bookings.Review.id")),
                  "numReviews",
                ],
                [
                  sequelize.fn("AVG", sequelize.col("Bookings.Review.stars")),
                  "avgRating",
                ],
              ],
              group: ["Bookings.id"],
            });
            return {
              where,
              include: [...includeObjects],
              attributes,
              ...extras,
            };
          }

          if (task === "Review") {
            includeObjects.push({
              model: Booking,
              where,
              attributes: [],
            });
            return {
              include: [...includeObjects],
              attributes,
              ...extras,
            };
          }
        },
      },
      hooks: {
        beforeDestroy: async (spot, options) => {
          const { Image } = require("../models");
          const images = await Image.findAll({
            where: {
              imageableId: spot.id,
              imageableType: "Spot",
            },
          });
          await Promise.all(images.map((image) => image.destroy()));
        },
      },
    }
  );

  return Spot;
};
