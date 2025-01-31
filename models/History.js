const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
  api: String,
  endpoint: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  responseData: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('History', historySchema)
