"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      account: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      telephone: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      point: {
        type: Sequelize.INTEGER,
        defaultValue: 100,
      },
      rank: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: "Tập sự",
      },
      avatar: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      notificationSetting: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      googleId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
