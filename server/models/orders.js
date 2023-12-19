'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders.init({
    address: DataTypes.STRING,
    fullName: DataTypes.STRING,
    city: DataTypes.STRING,
    telephone: DataTypes.STRING,
    email: DataTypes.STRING,
    totalMoney: DataTypes.INTEGER,
    type: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};