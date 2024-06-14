"use strict";

const {
  tbl_reservations,
  tbl_payments,
  tbl_transactions,
} = require("../models");
const { generateTransactionId } = require("../../utils/helper");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Loop untuk membuat 7 catatan reservasi
      for (let i = 4; i < 11; i++) {
        const user_id = `usr-${i}`;
        const room_id = `A-${i}`;
        const d_in = new Date("2024-06-01");
        const d_out = new Date("2024-06-03");
        const total_payment = 500000000;

        const reservationId = generateTransactionId("INV/");
        const payId = generateTransactionId("PAY/");
        const transId = generateTransactionId("TXN/");

        // Insert into tbl reservation
        await tbl_reservations.create(
          {
            reservation_id: reservationId,
            user_id: user_id,
            room_id: room_id,
            date_in: d_in,
            date_out: d_out,
            total_payment: total_payment,
          },
          { transaction }
        );

        // Insert into tbl payments
        await tbl_payments.create(
          {
            payment_id: payId,
            user_id: user_id,
            methode: "Debit",
            amount: total_payment,
            status: "Pending",
          },
          { transaction }
        );

        // Insert into tbl transactions
        await tbl_transactions.create(
          {
            trans_id: transId,
            user_id: user_id,
            payment_id: payId,
            reservation_id: reservationId,
            trans_date: new Date(),
          },
          { transaction }
        );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error("Error seeding createReservation:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tbl_reservations", null, {});
  },
};
