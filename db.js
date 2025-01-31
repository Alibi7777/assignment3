require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)

    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log('MongoDB connected'))
      .catch(err => {
        console.error('MongoDB connection error:', err)
        process.exit(1)
      })
  } catch (error) {
    console.error(' Database connection error', error)
    process.exit(1)
  }
}

module.exports = connectDB
