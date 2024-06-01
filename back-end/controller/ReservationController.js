const {
  tbl_transactions,
  tbl_payments,
  tbl_reservations,
  tbl_rooms_categories,
  tbl_rooms,
  sequelize,
} = require("../databases/models");

const { generateTransactionId } = require("../utils/helper");
const createReservation = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { user_id, room_id, d_in, d_out, total_payment } = req.body;
    const reservationId = generateTransactionId("INV/");
    const payId = generateTransactionId("PAY/");
    const transId = generateTransactionId("TXN/");
    //insert into tbl reservation
    const booking = await tbl_reservations.create(
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

    const payment = await tbl_payments.create(
      // Nanti perlu perbaikan setelah integrasi
      {
        payment_id: payId,
        user_id: user_id,
        methode: "Debit",
        amount: total_payment,
        status: "Pending",
      },
      { transaction }
    );

    const transactionRecord = await tbl_transactions.create(
      {
        trans_id: transId,
        user_id: user_id,
        payment_id: payId,
        reservation_id: reservationId,
        trans_date: new Date(),
      },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json(booking, payment, transactionRecord);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

const getAllReservations = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const totalCount = await tbl_reservations.count();
    const offset = (page - 1) * 10;
    const bookList = await tbl_reservations.findAll({
      offset,
      limit,
      include: [
        {
          model: tbl_rooms,
          as: "room",
          attributes: ["name"],
          include: [
            {
              model: tbl_rooms_categories,
              as: "type",
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    const response = {
      total_page: Math.ceil(totalCount / limit),
      currentPage: page,
      total_booking: totalCount,
      bookList,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const cancelBook = async (req, res, next) => {
//     try {
//         const {id} = req.query;
//         const {book, canceledReservation} = await tbl_reservations.update(
//             {archived: 1},
//             {where: {user_id: 'usr-2'}}
//         )
//         if (book[0] === 1){
//             res.status(200).json({message: "Reservation has been canceled", canceledReservation})
//         } else{
//             res.status(404).json({message: "Reservation not found"})
//         }
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// }
// const cancelBook = async (req, res, next) => {
//     try {
//         const { id } = req.query;

//         // Update reservasi berdasarkan ID yang diterima dari query parameter
//         const affectedRows = await tbl_reservations.update(
//             { archived: 1 },
//             { where: { reservation_id: id } } // Gunakan decodeId di sini
//         );

//         console.log(`Affected Rows: ${affectedRows}`); // Tambahkan ini untuk debug

//         // Periksa apakah ada baris yang diperbarui
//         if (affectedRows === 1) {
//             res.status(200).json({ message: "Reservation has been canceled" });
//         } else {
//             res.status(404).json({ message: id });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
const cancelBook = async (req, res, next) => {
  try {
    const { id } = req.query;
    const decodeId = decodeURIComponent(id);

    console.log(`Original ID: ${id}`); // Log untuk melihat nilai asli dari query
    console.log(`Decoded ID: ${decodeId}`); // Log untuk memastikan ID sudah benar

    // Gunakan findOne untuk memastikan bahwa data dengan ID yang diberikan ada
    const reservation = await tbl_reservations.findOne({
      where: { reservation_id: decodeId },
    });

    if (!reservation) {
      return res
        .status(404)
        .json({ message: `Reservation with ID ${decodeId} not found` });
    }

    // Update reservasi berdasarkan ID yang diterima dari query parameter
    const [affectedRows] = await tbl_reservations.update(
      {
        archived: 1,
        status: "Cancelled",
      },
      { where: { reservation_id: decodeId } }
    );

    console.log(`Affected Rows: ${affectedRows}`); // Log untuk debug jumlah baris yang diperbarui

    // Periksa apakah ada baris yang diperbarui
    if (affectedRows === 1) {
      const transaction = await tbl_transactions.findOne({
        where: { reservation_id: decodeId },
      });
      if (!transaction) {
        return res.json({
          message: `Transaction with reservation ID ${decodeId} not found`,
        });
      }
      const [paymentAffectedRows] = await tbl_payments.update(
        {
          status: "Failed",
        },
        { where: { payment_id: transaction.payment_id } }
      );

      console.log(`Payment Affected Rows: ${paymentAffectedRows}`);
      res.status(200).json({ message: "Reservation has been canceled" });
    } else {
      res
        .status(404)
        .json({ message: `Reservation with ID ${decodeId} not found` });
    }
  } catch (error) {
    console.error("Error during cancelation:", error); // Log error lebih detail
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  cancelBook,
  generateTransactionId,
};
