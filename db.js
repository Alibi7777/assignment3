require('dotenv').config(); 
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
//MONGO_URI=mongodb+srv://alibi:1234@cluster0.gg1ix.mongodb.net/assignment3?retryWrites=true&w=majority

        const conn = await mongoose.connect("mongodb+srv://alibi:1234@cluster0.gg1ix.mongodb.net/assignment3?retryWrites=true&w=majority"); 
        // const conn = await mongoose.connect(process.env.MONGO_URI); 
        console.log(`Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); 
    }
};

module.exports = connectDB; 
