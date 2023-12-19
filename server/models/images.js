"use strict";
const { Model } = require("sequelize");
const products = require("./products");
const descriptions = require("./descriptions");
const blogs = require("./blogs");
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.products, { foreignKey: "productId" });
      this.belongsTo(models.descriptions, { foreignKey: "descriptionId" });
      this.belongsTo(models.blogs, { foreignKey: "blogId" });
    }
  }
  images.init(
    {
      url: DataTypes.TEXT,
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: products,
          key: "id",
        },
        allowNull: true,
      },
      descriptionId: {
        type: DataTypes.INTEGER,
        references: {
          model: descriptions,
          key: "id",
        },
        allowNull: true,
      },
      blogId: {
        type: DataTypes.INTEGER,
        references: {
          model: blogs,
          key: "id",
        },
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "images",
    }
  );
  return images;
};
