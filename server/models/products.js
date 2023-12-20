"use strict";
const { Model } = require("sequelize");
const categories = require("./categories");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.categories, { foreignKey: "categoryId" });
      this.hasMany(models.images, { foreignKey: "productId" });
      this.hasMany(models.descriptions, { foreignKey: "productId" });
      this.hasMany(models.sales, { foreignKey: "productId" });
      this.hasMany(models.rates, { foreignKey: "productId" });
      this.hasOne(models.orderItems, { foreignKey: "productId" });
    }
  }
  products.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: categories,
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
