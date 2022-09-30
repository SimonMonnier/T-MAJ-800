const fs = require("fs");
const { parse } = require("csv-parse");

const ToreadSchema = require('../schema/ToreadSchema');

var data = []

async function processData(row) {
    data.push({
        "user_id": row[0],
        "book_id": row[1],
    });
}

async function Toread_import_scv() {
    fs.createReadStream("./import/to_read.csv")
        .pipe(parse({ delimiter: ",", quote: '"', from_line: 2, trim: true }))
        .on("data", row => processData(row))
        .on("error", error => console.log(error))
        .on("end", async () => {
            var requestdb = ToreadSchema.ToreadSchema;

            var result = await requestdb.insertMany(data);
            console.log(result);
            console.log("finished");
        });
}

module.exports = {
    Toread_import_scv,
};