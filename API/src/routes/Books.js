const cors = require('cors');
const { asyncMiddleware } = require('middleware-async');
const bp = require('body-parser');

const Books = require('../../src/gateway/Books');
const TokenVerify = require('../../src/gateway/TokenVerify');

module.exports = function (app) {
    app.use(bp.json());
    app.use(bp.urlencoded({ extended: true }));


    app.post('/import_books_csv', cors(), asyncMiddleware(async (req, res) => {
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            Books.Books_import_scv()
            res.status(200).json({ status: "OK" });
        }
    }))

    app.post('/books', cors(), asyncMiddleware(async (req, res) => {
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            var result = await Books.Books_Get_Books(req);
            if (result == -1)
                res.status(400).json({ status: "KO", message: "Page Vide" });
            else
                res.status(200).json({ status: "OK", message: result.item, maxpage: result.maxpage });
        }
    }))

    app.post('/book', cors(), asyncMiddleware(async (req, res) => {
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            var result = await Books.Books_Get_Book(req);
            if (result == -1)
                res.status(400).json({ status: "KO", message: "Page Vide" });
            else
                res.status(200).json({ status: "OK", message: result.item});
        }
    }))

    app.post('/searchbooks', cors(), asyncMiddleware(async (req, res) => {
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            var result = await Books.Books_Search_Books(req);
            if (result == -1)
                res.status(400).json({ status: "KO", message: "Page Vide" });
            else
                res.status(200).json({ status: "OK", message: result.item, maxpage: result.maxpage });
        }
    }))
};
