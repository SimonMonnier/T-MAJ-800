const fs = require("fs");
const { parse } = require("csv-parse");

const TagsSchema = require('../schema/TagsSchema');
var i = 0;
var total = 0;

async function processData(row) {
    var requestdb = TagsSchema.TagsSchema;
    await requestdb.create({
        tag_id: row[0],
        tag_name: row[1],
    }).then(function (data) {
        i++;
        if (i >= 200) {
            total = total + i;
            i = 0;
            console.log(total)
        }
    }).catch(function (err) {
        console.log(err);
    });

}

async function Tags_import_scv() {
    new Promise((resolve, reject) => {
        const promises = [];
        fs.createReadStream("./import/tags.csv")
            .pipe(parse({ delimiter: ",", quote: '"', from_line: 2, trim: true }))
            .on("data", row => promises.push(processData(row)))
            .on("error", reject)
            .on("end", async () => {
                await Promise.all(promises);
                resolve();
            });
    });
}

module.exports = {
    Tags_import_scv,
};