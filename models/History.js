const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
  api: String,
  endpoint: String,
  responseData: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('History', historySchema)
