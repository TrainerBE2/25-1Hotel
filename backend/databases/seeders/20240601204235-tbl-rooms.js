"use strict";

const { tbl_rooms } = require("../models"); // Sesuaikan dengan struktur direktori dan nama model Anda

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roomsData = [];

    // Data untuk diacak
    const categories = [1, 2, 3];
    const randomizeCategory = () => {
      return categories[Math.floor(Math.random() * categories.length)];
    };

    // Loop untuk membuat data kamar
    for (let i = 1; i <= 10; i++) {
      const roomId = `A-${i}`; // ID kamar dari A-1 hingga A-3
      const categoryId = randomizeCategory(); // ID kategori yang diacak
      const roomName = `Room ${i}`; // Nama kamar
      const roomDescription = `Description for Room ${i}`; // Deskripsi kamar
      const roomPrice = Math.floor(Math.random() * 500000) + 50000; // Harga kamar acak antara 50.000 dan 550.000
      const roomStatus = "Available"; // Status kamar

      roomsData.push({
        room_id: roomId,
        cat_id: categoryId,
        name: roomName,
        description: roomDescription,
        price: roomPrice,
        status: roomStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Masukkan data ke dalam tabel menggunakan bulkInsert
    return queryInterface.bulkInsert("tbl_rooms", roomsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tbl_rooms", null, {});
  },
};
