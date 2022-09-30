const mongoose = require('mongoose');

const { Schema } = mongoose;

const RatingSchema = new Schema({
    user_id: String,
    isbn: String,
    rating: String
});

const requestdb = mongoose.model('rating', RatingSchema);

module.exports.RatingSchema = requestdb;