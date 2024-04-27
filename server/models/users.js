"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.blogs, { foreignKey: "userId" });
      this.hasMany(models.searchs, { foreignKey: "userId" });
      this.hasMany(models.comments, { foreignKey: "userId" });
      this.hasMany(models.likes, { foreignKey: "userId" });
      this.hasMany(models.rates, { foreignKey: "userId" });
      this.hasMany(models.orders, { foreignKey: "userId" });
      this.hasMany(models.sales, { foreignKey: "userId" });
      this.hasMany(models.notifications, {
        foreignKey: "senderId",
        as: "Sender",
      });
      this.hasMany(models.notifications, {
        foreignKey: "receiverId",
        as: "Receiver",
      });
    }
  }
  users.init(
    {
      name: DataTypes.STRING,
      account: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.INTEGER,
      telephone: DataTypes.STRING,
      email: DataTypes.STRING,
      point: DataTypes.INTEGER,
      rank: DataTypes.INTEGER,
      title: DataTypes.STRING,
      avatar: DataTypes.STRING,
      status: DataTypes.INTEGER,
      googleId: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      point: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
