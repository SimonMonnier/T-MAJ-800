const cors = require('cors');
const { asyncMiddleware } = require('middleware-async');
const bp = require('body-parser');

const Rating = require('../../src/gateway/Rating');
const TokenVerify = require('../../src/gateway/TokenVerify');

module.exports = function (app) {
    app.use(bp.json());
    app.use(bp.urlencoded({ extended: true }));


    app.post('/import_rating_csv', cors(), asyncMiddleware(async (req, res) => {
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            Rating.Rating_import_scv()
            res.status(200).json({ status: "OK" });
        }
    }))

};
