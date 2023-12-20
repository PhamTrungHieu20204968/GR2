"use strict";
const { Model } = require("sequelize");
const users = require("./users");
module.exports = (sequelize, DataTypes) => {
  class blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.images, { foreignKey: "blogId" });
      this.hasMany(models.comments, { foreignKey: "blogId" });
      this.hasMany(models.likes, { foreignKey: "blogId" });
      this.belongsTo(models.users, { foreignKey: "userId" });
    }
  }
  blogs.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      tag: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: users,
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "blogs",
    }
  );
  return blogs;
};
