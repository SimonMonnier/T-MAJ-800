const cors = require('cors');
const { asyncMiddleware } = require('middleware-async');
const bp = require('body-parser');

const BooksTags = require('../../src/gateway/BooksTags');
const TokenVerify = require('../../src/gateway/TokenVerify');

module.exports = function (app) {
    app.use(bp.json());
    app.use(bp.urlencoded({ extended: true }));

    app.post('/import_bookstags_csv', cors(), asyncMiddleware(async (req, res) => {
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            BooksTags.BooksTags_import_scv()
            res.status(200).json({ status: "OK" });
        }
    }))

    app.get('/bookstags', cors(), asyncMiddleware(async (req, res) => {
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            BooksTags.BooksTags_getAll()
            res.status(200).json({ status: "OK" });
        }
    }))
};
