const mongoose = require('mongoose')

const ReviewHistorySchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('ReviewHistory', ReviewHistorySchema)
