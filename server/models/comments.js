"use strict";
const { Model } = require("sequelize");
const users = require("./users");
const blogs = require("./blogs");
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.likes, { foreignKey: "commentId", as: "CommentId" });
      this.belongsTo(models.users, { foreignKey: "userId" });
      this.belongsTo(models.blogs, { foreignKey: "blogId" });
    }
  }
  comments.init(
    {
      content: DataTypes.STRING,
      parent: DataTypes.INTEGER,
      edited: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: users,
          key: "id",
        },
        allowNull: false,
      },
      blogId: {
        type: DataTypes.INTEGER,
        references: {
          model: blogs,
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "comments",
    }
  );
  return comments;
};
