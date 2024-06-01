"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_reviews", {
      review_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "tbl_users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      reservation_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "tbl_reservations",
          key: "reservation_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      rate: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      verbal: {
        type: Sequelize.STRING,
      },
      archived: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
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
    await queryInterface.dropTable("tbl_reviews");
  },
};
