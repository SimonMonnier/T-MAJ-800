const cors = require('cors');
const { asyncMiddleware } = require('middleware-async');
const bp = require('body-parser');
const IA = require('../gateway/IA');
const TokenVerify = require('../gateway/TokenVerify');
const cron = require('node-cron');

module.exports = function (app) {
    app.use(bp.json());
    app.use(bp.urlencoded({ extended: true }));

    app.post('/generate_data_csv', cors(), asyncMiddleware(async (req, res) => {
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            IA.AI_export_csv()
            res.status(200).json({ status: "OK" });
        }
    }))

    app.post('/recommend', cors(), asyncMiddleware(async (req, res) => {
        var recommend = await IA.AI_recommend(req, res)

    }))

    cron.schedule('0 * * * *', function () {
        IA.AI_export_csv();
    });
};
