const { DOUBLE } = require("sequelize");
const {
  tbl_transactions,
  tbl_payments,
  tbl_reservations,
  tbl_rooms_categories,
  tbl_rooms,
  tbl_users,
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

const createReservation = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { user_id, room_id, d_in, d_out } = req.body;

    // Validasi input
    if (!user_id || !room_id || !d_in || !d_out) {
      return sendErrorResponse(res, 400, "All fields are required");
    }

    const roomDetail = await tbl_rooms.findByPk(room_id);
    const userDetail = await tbl_users.findByPk(user_id);

    if (!roomDetail) {
      await transaction.rollback();
      return sendErrorResponse(res, 400, "Room Not Found");
    }

    if (!userDetail) {
      await transaction.rollback();
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

    // Integrasi Midtrans
    const authString = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString(
      "base64"
    );
    const payload = {
      transaction_details: { order_id: transId, gross_amount: grossAmount },
      item_details: [
        {
          id: room_id,
          price: roomDetail.price,
          quantity: calculateNights(d_in, d_out),
          name: roomDetail.name,
        },
      ],
      customer_details: {
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.status !== 201) {
      await transaction.rollback();
      return sendErrorResponse(res, 500, "Failed to create transaction");
    }

    const data = await response.json();

    const booking = await tbl_reservations.create(
      {
        reservation_id: reservationId,
        user_id,
        room_id,
        date_in: d_in,
        date_out: d_out,
        total_payment: grossAmount,
      },
      { transaction }
    );

    const payment = await tbl_payments.create(
      {
        payment_id: payId,
        user_id,
        method: "Debit",
        amount: grossAmount,
        status: PENDING_PAYMENT,
      },
      { transaction }
    );

    const transactionRecord = await tbl_transactions.create(
      {
        trans_id: transId,
        user_id,
        payment_id: payId,
        reservation_id: reservationId,
        trans_date: new Date(),
      },
      { transaction }
    );

    await transaction.commit();

    sendSuccessResponse(res, 201, "Success", {
      id: reservationId,
      status: PENDING_PAYMENT,
      first_name: userDetail.first_name,
      last_name: userDetail.last_name,
      email: userDetail.email,
      snap_token: data.token,
      snap_redirect_url: data.redirect_url,
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

const getAllReservations = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const totalCount = await tbl_reservations.count();
    const offset = (page - 1) * limit;

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
    next(error);
  }
};

const cancelBook = async (req, res, next) => {
  try {
    const { id } = req.query;
    const decodeId = decodeURIComponent(id);

    const reservation = await tbl_reservations.findOne({
      where: { reservation_id: decodeId },
    });

    if (!reservation) {
      return sendErrorResponse(
        res,
        404,
        `Reservation with ID ${decodeId} not found`
      );
    }

    const [affectedRows] = await tbl_reservations.update(
      { archived: 1, status: "Cancelled" },
      { where: { reservation_id: decodeId } }
    );

    if (affectedRows === 1) {
      const transaction = await tbl_transactions.findOne({
        where: { reservation_id: decodeId },
      });

      if (!transaction) {
        return sendErrorResponse(
          res,
          404,
          `Transaction with reservation ID ${decodeId} not found`
        );
      }

      const [paymentAffectedRows] = await tbl_payments.update(
        { status: "Failed" },
        { where: { payment_id: transaction.payment_id } }
      );

      if (paymentAffectedRows === 1) {
        sendSuccessResponse(res, 200, "Reservation has been canceled", null);
      } else {
        sendErrorResponse(res, 500, "Failed to update payment status");
      }
    } else {
      sendErrorResponse(res, 404, `Reservation with ID ${decodeId} not found`);
    }
  } catch (error) {
    next(error);
  }
};

const getReservationById = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return sendErrorResponse(res, 400, "Reservation ID is required");
    }

    const decodeId = decodeURIComponent(id);
    const reservation = await tbl_reservations.findOne({
      where: { reservation_id: decodeId },
    });

    if (!reservation) {
      return sendErrorResponse(
        res,
        404,
        `Reservation with ID ${decodeId} not found`
      );
    }

    sendSuccessResponse(res, 200, "Reservation found", reservation);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  cancelBook,
  getReservationById,
};
