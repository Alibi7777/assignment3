const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: {type: Boolean, default:false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
    deletedAt: {type: Date}
});

module.exports = mongoose.model('User', userSchema)