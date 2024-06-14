const { DOUBLE } = require("sequelize");
const {
  tbl_transactions,
  tbl_payments,
  tbl_reservations,
  tbl_rooms_categories,
  tbl_rooms,
  sequelize,
} = require("../databases/models");
const {
  MIDTRANS_SERVER_KEY,
  FRONT_END_URL,
  MIDTRANS_APP_URL,
  PENDING_PAYMENT,
} = require("../utils/constant");

const { generateTransactionId } = require("../utils/helper");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");

const createReservation = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { user_id, room_id, d_in, d_out } = req.body;
    const roomDetail = await tbl_rooms.findByPk(room_id);
    const userDetail = await tbl_users.findByPk(user_id);
    if (!roomDetail) {
      return sendErrorResponse(res, 400, "Room Not Found");
    } else if (!userDetail) {
      return sendErrorResponse(res, 400, "User Not Found");
    }
    const reservationId = generateTransactionId("INV/");
    const payId = generateTransactionId("PAY/");
    const transId = generateTransactionId("TXN/");
    const calculateNights = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const nights = (end - start) / (1000 * 60 * 60 * 24);
      return nights;
    };
    const grossAmount = roomDetail.price * calculateNights(d_in, d_out);
    /* 
      Midtrans Integration
    */
    const authString = btoa(`${MIDTRANS_SERVER_KEY}:`);
    const payload = {
      transaction_details: { order_id: transId, grossAmount },
      item_details: {
        id: room_id,
        price: roomDetail.price,
        quantity: calculateNights(d_in, d_out),
        name: roomDetail.name,
      },
      customer_detaila: {
        first_name: userDetail.first_name,
        last_name: userDetail.last_name,
        email: userDetail.email,
      },
      callbacks: {
        finish: `${FRONT_END_URL}/order-status?transaction_id=${transId}`,
        error: `${FRONT_END_URL}/order-status?transaction_id=${transId}`,
        pending: `${FRONT_END_URL}/order-status?transaction_id=${transId}`,
      },
    };

    const response = await fetch(`${MIDTRANS_APP_URL}/snap/v1/transactions`, {
      method: post,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(payload),
    });
    if (response.status !== 201) {
      return sendErrorResponse(res, 500, "Failed to create transaction");
    }
    const data = await response.json();
    const booking = await tbl_reservations.create(
      {
        reservation_id: reservationId,
        user_id: user_id,
        room_id: room_id,
        date_in: d_in,
        date_out: d_out,
        total_payment: grossAmount,
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
    sendSuccessResponse(res, 201, "succes", {
      data: {
        id: reservationId,
        status: PENDING_PAYMENT,
        first_name: userDetail.first_name,
        last_name: userDetail.last_name,
        email: userDetail.email,
        snap_token: data.token,
        snap_redirect_url: data.redirect_url,
      },
    });
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

    console.log(`Original ID: ${id}`);
    console.log(`Decoded ID: ${decodeId}`);
    const reservation = await tbl_reservations.findOne({
      where: { reservation_id: decodeId },
    });

    if (!reservation) {
      return res
        .status(404)
        .json({ message: `Reservation with ID ${decodeId} not found` });
    }
    const [affectedRows] = await tbl_reservations.update(
      {
        archived: 1,
        status: "Cancelled",
      },
      { where: { reservation_id: decodeId } }
    );

    console.log(`Affected Rows: ${affectedRows}`);
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
    console.error("Error during cancelation:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  cancelBook,
  generateTransactionId,
};
