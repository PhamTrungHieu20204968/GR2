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
      avatar: DataTypes.STRING,
      status: DataTypes.INTEGER,
      googleId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
