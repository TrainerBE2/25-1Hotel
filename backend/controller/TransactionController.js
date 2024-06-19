const crypto = require("crypto");
const { tbl_transactions, tbl_payments } = require("../databases/models"); // Sesuaikan dengan model transaksi Anda
const { PAID, CANCELED, PENDING_PAYMENT } = require("../utils/constant");
const { stat } = require("fs");

// Fungsi untuk memverifikasi signature key
const verifySignature = (
  signatureKey,
  orderId,
  statusCode,
  grossAmount,
  serverKey
) => {
  const input = orderId + statusCode + grossAmount + serverKey;
  const hash = crypto.createHash("sha512").update(input).digest("hex");
  return hash === signatureKey;
};

const handlePaymentNotification = async (req, res) => {
  const {
    transaction_time,
    transaction_status,
    transaction_id,
    status_message,
    status_code,
    signature_key,
    payment_type,
    order_id,
    merchant_id,
    masked_card,
    gross_amount,
    fraud_status,
    eci,
    currency,
    channel_response_message,
    channel_response_code,
    card_type,
    bank,
    approval_code,
  } = req.body;

  // Server key dari Midtrans Dashboard
  const serverKey = process.env.MIDTRANS_SERVER_KEY;

  // Verifikasi signature key
  const isSignatureValid = verifySignature(
    signature_key,
    order_id,
    status_code,
    gross_amount,
    serverKey
  );
  if (!isSignatureValid) {
    return res.status(400).json({ message: "Invalid signature key" });
  }

  try {
    // Proses notifikasi sesuai dengan kebutuhan Anda
    // Misalnya, update status transaksi di database
    const transaction = await tbl_transactions.findOne({
      where: { trans_id: order_id },
    });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Update status transaksi dan pembayaran sesuai status notifikasi dari Midtrans
    if (transaction_status === "capture" && fraud_status === "accept") {
      await updateTransactionAndPayment(
        res,
        order_id,
        transaction_time,
        card_type,
        PAID,
        payment_type
      );
    } else if (transaction_status === "settlement") {
      await updateTransactionAndPayment(
        res,
        order_id,
        transaction_time,
        card_type,
        PAID,
        payment_type
      );
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      await updateTransactionAndPayment(
        res,
        order_id,
        transaction_time,
        card_type,
        CANCELED
      );
    } else if (transaction_status === "pending") {
      await updateTransactionAndPayment(
        res,
        order_id,
        transaction_time,
        card_type,
        PENDING_PAYMENT
      );
    }
  } catch (error) {
    console.error("Error processing payment notification:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const handleSuccess = (req, res) => {
  res
    .status(200)
    .json({ status: 200, message: "Payment successfully processed" });
};

const handleFailed = (req, res) => {
  res.status(200).json({ status: 200, message: "Payment failed to process" });
};

const updateTransactionAndPayment = async (
  res,
  order_id,
  transaction_time,
  card_type,
  status,
  payment_type
) => {
  if (status != PENDING_PAYMENT || status != CANCELED) {
    try {
      const transaction = await tbl_transactions.findOne({
        where: { trans_id: order_id },
      });
      if (!transaction) {
        return res
          .status(404)
          .json({ status: 404, message: "Transaction not found" });
      }
      await transaction.update({
        trans_date: transaction_time,
      });
      const payment = await tbl_payments.findOne({
        where: { payment_id: transaction.payment_id },
      });
      if (payment) {
        await payment.update({
          methode: payment_type,
          status: status,
        });
      }

      return res.status(200).json({ status: 200, message: "OK" });
    } catch (error) {
      console.error("Error updating transaction and payment:", error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  } else {
    return res.status(200).json({ status: 200, message: "OK" });
  }
};

module.exports = {
  handlePaymentNotification,
  handleFailed,
  handleSuccess,
};
