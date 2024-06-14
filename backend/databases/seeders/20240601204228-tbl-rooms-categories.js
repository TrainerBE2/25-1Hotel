"use strict";

const { DATE } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    try {
      const catRooms = [
        {
          name: "President Suite",
          description: "Kamar mewah Megah enak untuk apapun",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Standard Room",
          description: "Kamar standar dengan fasilitas dasar",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Suite",
          description: "Kamar mewah dengan fasilitas tambahan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      await queryInterface.bulkInsert("tbl_rooms_categories", catRooms, {});
    } catch (error) {}
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("tbl_rooms", null, {});
  },
};
