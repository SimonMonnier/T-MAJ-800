const fs = require("fs");
const csvwriter = require('csv-writer');
const { spawn } = require('child_process')
const PythonShell = require('python-shell').PythonShell;

const BooksSchema = require('../schema/BooksSchema');
const BooksTagsSchema = require('../schema/BooksTagsSchema');
const TagsSchema = require('../schema/TagsSchema');


async function AI_export_csv() {
    console.log('*** Task Start: Reloading CSV File From Data Base ***');
    console.time('Export_csv')
    const promises = [];

    promises.push(AI_export_books());
    promises.push(AI_export_bookstags());
    promises.push(AI_export_tags());

    await Promise.allSettled(promises)
        .then((results) => results.forEach((result) => console.log(result.status)));
    console.timeEnd('Export_csv');
    console.log('*** Task End: CSV File From Data Base ***');
}

async function AI_export_books() {
    var requestdb = BooksSchema.BooksSchema;
    var createCsvWriter = csvwriter.createObjectCsvWriter
    var books = await requestdb.find();

    const csvWriter = createCsvWriter({
        path: './export/books.csv',
        fieldDelimiter: ';',
        header: [
            { id: 'book_id', title: 'book_id' },
            { id: 'best_book_id', title: 'best_book_id' },
            { id: 'work_id', title: 'work_id' },
            { id: 'books_count', title: 'books_count' },
            { id: 'isbn', title: 'isbn' },
            { id: 'isbn13', title: 'isbn13' },
            { id: 'authors', title: 'authors' },
            { id: 'original_publication_year', title: 'original_publication_year' },
            { id: 'original_title', title: 'original_title' },
            { id: 'title', title: 'title' },
            { id: 'language_code', title: 'language_code' },
            { id: 'average_rating', title: 'average_rating' },
            { id: 'ratings_count', title: 'ratings_count' },
            { id: 'work_ratings_count', title: 'work_ratings_count' },
            { id: 'work_text_reviews_count', title: 'work_text_reviews_count' },
            { id: 'ratings_1', title: 'ratings_1' },
            { id: 'ratings_2', title: 'ratings_2' },
            { id: 'ratings_3', title: 'ratings_3' },
            { id: 'ratings_4', title: 'ratings_4' },
            { id: 'ratings_5', title: 'ratings_5' },
            { id: 'image_url', title: 'image_url' },
            { id: 'small_image_url', title: 'small_image_url' }
        ]
    });
    csvWriter
        .writeRecords(books)
        .then(() => console.log('Data Books Write Into CSV Successfully'));
}


async function AI_export_bookstags() {
    var requestdb = BooksTagsSchema.BooksTagsSchema;
    var createCsvWriter = csvwriter.createObjectCsvWriter
    var result = await requestdb.find();

    const csvWriter = createCsvWriter({
        path: './export/books_tags.csv',
        fieldDelimiter: ';',
        header: [
            { id: 'book_id', title: 'book_id' },
            { id: 'tag_id', title: 'tag_id' },
            { id: 'count', title: 'count' }
        ]
    });
    csvWriter
        .writeRecords(result)
        .then(() => console.log('Data BooksTags Write Into CSV Successfully'));
}

async function AI_export_tags() {
    var requestdb = TagsSchema.TagsSchema;
    var createCsvWriter = csvwriter.createObjectCsvWriter
    var result = await requestdb.find();

    const csvWriter = createCsvWriter({
        path: './export/tags.csv',
        fieldDelimiter: ';',
        header: [
            { id: 'tag_id', title: 'tag_id' },
            { id: 'tag_name', title: 'tag_name' }
        ]
    });
    csvWriter
        .writeRecords(result)
        .then(() => console.log('Data BooksTags Write Into CSV Successfully'));
}


// async function AI_recommend(req, res) {
//     var requestdb = BooksSchema.BooksSchema;
//     console.time('recommand')
//     const python = spawn('python', ['script_python/recommender.py', req.body.title])
//     var dataToSend = "";

//     python.stdout.on('data', async function (data) {

//         dataToSend = data.toString();
//         var data_slice = dataToSend.slice(0, -2);
//         var data_split = data_slice.split('; ');
//         var resultdb = await requestdb.find({ "title": { $in: data_split } });
//         console.timeEnd('recommand')
//         res.status(200).json({ status: "OK", recommend: resultdb });
//         console.log(dataToSend);
//     });

//     python.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//     });

//     python.on('close', (code) => {
//         console.log(`child process close all stdio with code ${code}`);
//     });
// }


async function AI_recommend(req, res) {
    var requestdb = BooksSchema.BooksSchema;
    console.time('recommand')

    var options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: './script_python/',
        args: [req.body.search]
    };
    
    PythonShell.run('recommender.py', options, async function (err, results) {
        if (err) {
            console.timeEnd('recommand')
            return res.status(200).json({ status: "KO"});
        }
            
        dataToSend = results.toString();
        var data_slice = dataToSend.slice(0, -2);
        var data_split = data_slice.split('; ');
        var resultdb = await requestdb.find({ "title": { $in: data_split } });
        res.status(200).json({ status: "OK", recommend: resultdb });
        console.log(dataToSend);
        console.timeEnd('recommand')
    });
    // const python = spawn('python', ['script_python/recommender.py', req.body.title])
}



module.exports = {
    AI_export_csv,
    AI_export_books,
    AI_export_bookstags,
    AI_export_tags,
    AI_recommend
};