"use strict";
const { Model } = require("sequelize");
const products = require("./products");
const orders = require("./orders");
module.exports = (sequelize, DataTypes) => {
  class orderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.products, { foreignKey: "productId" });
      this.belongsTo(models.orders, { foreignKey: "orderId" });
    }
  }
  orderItems.init(
    {
      quantity: DataTypes.INTEGER,
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: products,
          key: "id",
        },
        allowNull: false,
      },
      orderId: {
        type: DataTypes.INTEGER,
        references: {
          model: orders,
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "orderItems",
    }
  );
  return orderItems;
};
