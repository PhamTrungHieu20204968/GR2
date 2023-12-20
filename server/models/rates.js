'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, { foreignKey: "userId" });
      this.belongsTo(models.products, { foreignKey: "productId" });
    }
  }
  rates.init({
    rate: DataTypes.FLOAT,
    content: DataTypes.STRING,
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: products,
        key: "id",
      },
      allowNull: false,
    },
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
    modelName: 'rates',
  });
  return rates;
};