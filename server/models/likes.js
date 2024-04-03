"use strict";
const { Model } = require("sequelize");
const users = require("./users");
const blogs = require("./blogs");
const comments = require("./comments");
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, { foreignKey: "userId" });
      this.belongsTo(models.blogs, { foreignKey: "blogId" });
      this.belongsTo(models.comments, {
        foreignKey: "commentId",
        as: "CommentId",
      });
    }
  }
  likes.init(
    {
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
        allowNull: true,
      },
      commentId: {
        type: DataTypes.INTEGER,
        references: {
          model: comments,
          key: "id",
        },
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "likes",
    }
  );
  return likes;
};
