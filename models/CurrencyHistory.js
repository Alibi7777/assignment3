const mongoose = require('mongoose')

const CurrencyHistorySchema = new mongoose.Schema({
  user: { type: String, required: true },
  baseCurrency: { type: String, required: true },
  targetCurrency: { type: String, required: true },
  exchangeRate: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('CurrencyHistory', CurrencyHistorySchema)
