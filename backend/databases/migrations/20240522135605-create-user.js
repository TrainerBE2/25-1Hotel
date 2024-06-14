'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_users', {
      user_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone_number : {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING 
      },
      role: {
        type: Sequelize.ENUM,
        values: ['root', 'admin', 'user'],
        allowNull: false,
        defaultValue: 'user'
      },
      token: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email_verified : {
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      archived : {
        type: Sequelize.TINYINT,
        defaultValue: 0
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
    await queryInterface.dropTable('tbl_users');
  }
};