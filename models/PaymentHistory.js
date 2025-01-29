const mongoose = require("mongoose");

const paymentHistorySchema = new mongoose.Schema({
  orderId: String,
  amount: String,
  currency: String,
  status: String,
  createTime: String,
  payer: Object,
  items: Array,
});

module.exports = mongoose.model("PaymentHistory", paymentHistorySchema);
