"use strict";
const { Model } = require("sequelize");
const users = require("./users");
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, { foreignKey: "userId" });
      this.hasMany(models.orderItems, { foreignKey: "orderId" });
    }
  }
  orders.init(
    {
      address: DataTypes.STRING,
      fullName: DataTypes.STRING,
      city: DataTypes.STRING,
      telephone: DataTypes.STRING,
      email: DataTypes.STRING,
      totalMoney: DataTypes.INTEGER,
      type: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: users,
          key: "id",
        },
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "orders",
    }
  );
  return orders;
};
