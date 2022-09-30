const mongoose = require('mongoose');

const { Schema } = mongoose;

const BooksTagsSchema = new Schema({
    book_id: String,
    tag_id: String,
    count: String,
});

const requestdb = mongoose.model('books_tags', BooksTagsSchema);

module.exports.BooksTagsSchema = requestdb;