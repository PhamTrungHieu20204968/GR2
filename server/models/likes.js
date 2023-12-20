"use strict";
const { Model } = require("sequelize");
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
      this.belongsTo(models.comments, { foreignKey: "commentId" });
    }
  }
  likes.init(
    {
      comment: DataTypes.STRING,
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
      commentId: {
        type: DataTypes.INTEGER,
        references: {
          model: comments,
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "likes",
    }
  );
  return likes;
};
