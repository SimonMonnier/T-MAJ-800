const fs = require("fs");
const { parse } = require("csv-parse");

const BooksSchema = require('../schema/BooksSchema');
// var i = 0;
// var total = 0;
var data = []

async function processData(row) {
    data.push({
        "book_id": row[1],
        "best_book_id": row[2],
        "work_id": row[3],
        "books_count": row[4],
        "isbn": row[5],
        "isbn13": row[6],
        "authors": row[7],
        "original_publication_year": row[8],
        "original_title": row[9],
        "title": row[10],
        "language_code": row[11],
        "average_rating": row[12],
        "ratings_count": row[13],
        "work_ratings_count": row[14],
        "work_text_reviews_count": row[15],
        "ratings_1": row[16],
        "ratings_2": row[17],
        "ratings_3": row[18],
        "ratings_4": row[19],
        "ratings_5": row[20],
        "image_url": row[21],
        "small_image_url": row[22],
    });
}

async function Books_import_scv() {
    fs.createReadStream("./import/books.csv")
        .pipe(parse({ delimiter: ";", quote: '"', from_line: 2, trim: true }))
        .on("data", row => processData(row))
        .on("error", error => console.log(error))
        .on("end", async () => {
            var requestdb = BooksSchema.BooksSchema;

            var result = await requestdb.insertMany(data);
            console.log(result);
            console.log("finished");
        });
}

async function Books_Get_Books(req) {
    var requestdb = BooksSchema.BooksSchema;
    var perPage = 15;
    var page = Math.max(0, req.body.page);

    var maxPage = await requestdb.countDocuments() / 6;

    maxPage = maxPage.toFixed(0);

    result = new Object();

    if (page > maxPage)
        return -1;
    else {
        result.item = await requestdb.find().limit(perPage).skip(perPage * page);
        result.maxpage = maxPage;
        return result;
    }
}

async function Books_Get_Book(req) {
    var requestdb = BooksSchema.BooksSchema;

    result = new Object();

    result.item = await requestdb.find({ "book_id": req.body.book_id });
    console.log(result.item);
    return result;
}

async function Books_Search_Books(req) {
    var requestdb = BooksSchema.BooksSchema;

    result = new Object();

    result.item = await requestdb.find({ "title": { $regex: req.body.search } }).limit(15);
    return result;
}

module.exports = {
    Books_import_scv,
    Books_Get_Books,
    Books_Get_Book,
    Books_Search_Books
};