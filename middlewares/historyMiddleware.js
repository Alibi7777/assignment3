const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const History = require('../models/History')

const logHistory = async (req, res, next) => {
  const token = req.cookies?.token // Read token from cookies
  let userId = null

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) //  Synchronous verification
    userId = decoded.id //
  }

  const requestData = {
    api: req.baseUrl || req.originalUrl, // API Name or endpoint
    endpoint: req.path,
    user: userId ? new mongoose.Types.ObjectId(userId) : null, //  Convert to ObjectId
    timestamp: new Date()
  }

  // Capture the response data after sending response
  const originalSend = res.json

  res.json = async function (data) {
    requestData.responseData = data

    // Save to database
    try {
      await History.create(requestData)
    } catch (error) {
      console.error('Failed to log history:', error.message)
    }

    originalSend.call(this, data)
  }

  next()
}

module.exports = logHistory
