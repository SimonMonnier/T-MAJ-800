const mongoose = require('mongoose');

const { Schema } = mongoose;

const ToreadSchema = new Schema({
    user_id: String,
    book_id: String
});

const requestdb = mongoose.model('to_reads', ToreadSchema);

module.exports.ToreadSchema = requestdb;