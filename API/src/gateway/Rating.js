const fs = require("fs");
const { parse } = require("csv-parse");

const RatingSchema = require('../schema/RatingSchema');
// var i = 0;
// var total = 0;
var data = []

async function processData(row) {
    data.push({ "user_id": row[0], "isbn": row[1], "rating": row[2] });
    return;
    // var requestdb = RatingSchema.RatingSchema;
    // await requestdb.create({
    //     user_id: row[0],
    //     isbn: row[1],
    //     rating: row[2]
    // }).lean()
    //     .then(function (data) {
    //         // i++;
    //         // if (i >= 100) {
    //         //     total = total + i;
    //         //     i = 0;
    //         //     console.log(total)
    //         // }
    //         return;
    //     }).catch(function (err) {
    //         console.log(err);
    //     });
}

async function Rating_import_scv() {

    fs.createReadStream("./import/ratings.csv")
        .pipe(parse({ delimiter: ";", quote: '"', from_line: 2, trim: true }))
        .on("data", row => processData(row))
        .on("error", error => console.log(error))
        .on("end", async () => {
            // console.log(data);
            var requestdb = RatingSchema.RatingSchema;
            var result = await requestdb.insertMany(data);
            console.log(result.insertedCount);
            console.log("finished");
        });
}

module.exports = {
    Rating_import_scv,
};