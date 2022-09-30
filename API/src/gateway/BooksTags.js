const fs = require("fs");
const { parse } = require("csv-parse");

const BooksTagsSchema = require('../schema/BooksTagsSchema');
// var i = 0;
// var total = 0;
var data = []

async function processData(row) {
    data.push({
        "book_id": row[0],
        "tag_id": row[1],
        "count": row[2],
    });
}

async function BooksTags_import_scv() {
    fs.createReadStream("./import/book_tags.csv")
        .pipe(parse({ delimiter: ",", quote: '"', from_line: 2, trim: true }))
        .on("data", row => processData(row))
        .on("error", error => console.log(error))
        .on("end", async () => {
            var requestdb = BooksTagsSchema.BooksTagsSchema;

            var result = await requestdb.insertMany(data);
            console.log(result);
            console.log("finished");
        });
}

async function BooksTags_getAll() {
    var requestdb = BooksTagsSchema.BooksTagsSchema;

    var result = await requestdb.find({});
    console.log(result);
}

module.exports = {
    BooksTags_import_scv,
    BooksTags_getAll
};