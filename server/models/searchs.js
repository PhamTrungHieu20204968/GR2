'use strict';
const {
  Model
} = require('sequelize');
const users = require("./users");
module.exports = (sequelize, DataTypes) => {
  class searchs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, { foreignKey: "userId" });
    }
  }
  searchs.init({
    search: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: users,
        key: "id",
      },
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'searchs',
  });
  return searchs;
};