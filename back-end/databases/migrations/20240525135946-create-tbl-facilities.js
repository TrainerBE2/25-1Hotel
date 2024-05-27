'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_facilities', {
      facilities_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cat_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbl_rooms_categories',
          key: 'cat_id'
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      facilities: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_facilities');
  }
};