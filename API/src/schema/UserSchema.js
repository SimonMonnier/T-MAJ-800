const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    hash: String,
    salt: String,
    pseudo: {
        type: String,
        unique: true
    },
});

const requestdb = mongoose.model('user', UserSchema);

module.exports.UserSchema = requestdb;