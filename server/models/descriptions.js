"use strict";
const { Model } = require("sequelize");
const products = require("./products");
module.exports = (sequelize, DataTypes) => {
  class descriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.products, { foreignKey: "productId" });
      this.hasMany(models.images, { foreignKey: "descriptionId" });
    }
  }
  descriptions.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT("long"),
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: products,
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "descriptions",
    }
  );
  return descriptions;
};
