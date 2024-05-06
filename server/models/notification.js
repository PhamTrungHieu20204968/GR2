"use strict";
const { Model } = require("sequelize");
const users = require("./users");
const blogs = require("./blogs");
const comments = require("./comments");
const orders = require("./orders");
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, { foreignKey: "senderId", as: "Sender" });
      this.belongsTo(models.users, {
        foreignKey: "receiverId",
        as: "Receiver",
      });
      this.belongsTo(models.blogs, { foreignKey: "blogId" });
      this.belongsTo(models.comments, {
        foreignKey: "commentId",
      });
      this.belongsTo(models.orders, {
        foreignKey: "orderId",
      });
    }
  }
  notifications.init(
    {
      senderId: {
        type: DataTypes.INTEGER,
        references: {
          model: users,
          key: "id",
        },
        allowNull: true,
      },
      receiverId: {
        type: DataTypes.INTEGER,
        references: {
          model: users,
          key: "id",
        },
        allowNull: false,
      },
      content: DataTypes.STRING,
      type: DataTypes.INTEGER,
      sendTime: DataTypes.STRING,
      repeatTime: DataTypes.STRING,
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
      orderId: {
        type: DataTypes.INTEGER,
        references: {
          model: orders,
          key: "id",
        },
        allowNull: true,
      },
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "notifications",
    }
  );
  return notifications;
};
