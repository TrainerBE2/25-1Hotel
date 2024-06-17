"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Menggunakan bcrypt untuk mengenkripsi kata sandi
    const hashedPassword = await bcrypt.hash("securepassword", 10);

    // Data pengguna yang akan dimasukkan
    const users = [
      // Root User
      {
        user_id: "usr-3",
        first_name: "Root",
        last_name: "User",
        email: "root@example.com",
        phone_number: "1234567890",
        password: hashedPassword,
        role: "root",
        verification_token: "sometoken",
        email_verified: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Admin Users
      {
        user_id: "usr-1",
        first_name: "Admin",
        last_name: "One",
        email: "admin1@example.com",
        phone_number: "1234567891",
        password: hashedPassword,
        role: "admin",
        verification_token: "sometoken",
        email_verified: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: "usr-2",
        first_name: "Admin",
        last_name: "Two",
        email: "admin2@example.com",
        phone_number: "1234567892",
        password: hashedPassword,
        role: "admin",
        verification_token: "sometoken",
        email_verified: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Menambahkan pengguna lain sebagai pengguna biasa
    for (let i = 4; i <= 11; i++) {
      users.push({
        user_id: `usr-${i}`,
        first_name: `John${i}`,
        last_name: `Doe${i}`,
        email: `user${i}@example.com`,
        phone_number: `123456789${i}`,
        password: hashedPassword,
        role: "user",
        verification_token: "sometoken",
        email_verified: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Memasukkan data pengguna ke dalam tabel
    return queryInterface.bulkInsert("tbl_users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Menghapus semua data pengguna dari tabel
    return queryInterface.bulkDelete("tbl_users", null, {});
  },
};
