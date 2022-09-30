const mongoose = require('mongoose');

const { Schema } = mongoose;

const BooksSchema = new Schema({
    book_id: {
        type: String,
        unique: true
    },
    best_book_id: String,
    work_id: String,
    books_count: String,
    isbn: String,
    isbn13: String,
    authors: String,
    original_publication_year: String,
    original_title: String,
    title: String,
    language_code: String,
    average_rating: String,
    ratings_count: String,
    work_ratings_count: String,
    work_text_reviews_count: String,
    ratings_1: String,
    ratings_2: String,
    ratings_3: String,
    ratings_4: String,
    ratings_5: String,
    image_url: String,
    small_image_url: String,
});

const requestdb = mongoose.model('books', BooksSchema);

module.exports.BooksSchema = requestdb;