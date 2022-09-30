const cors = require('cors');
const { asyncMiddleware } = require('middleware-async');
const bp = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Authentification = require('../../src/gateway/Authentification');
const TokenVerify = require('../../src/gateway/TokenVerify');

module.exports = function (app) {
    app.use(bp.json());
    app.use(bp.urlencoded({ extended: true }));

    app.post('/login', cors(), asyncMiddleware(async (req, res) => {
        var result = await Authentification.Authentification_Login(req);
        var status = 0;

        if (result != null) {
            var hash = crypto.pbkdf2Sync(req.body.password, result.salt, 1000, 64, `sha512`).toString(`hex`);
            if (hash != result.hash)
                status = -2
        } else {
            status = -1;
        }

        switch (status) {
            case 0:
                res.status(200).json({
                    userId: result._id,
                    status: "OK",
                    email: result.email,
                    pseudo: result.pseudo,
                    token: jwt.sign({ userId: result._id, email: result.email, pseudo: result.pseudo },
                        '%hx5g@BdocPDX4D^P#owO#11tg5R$RX#', { expiresIn: '24h' }
                    ),
                    message: "Connexion réussie"
                });
                break;
            case -1:
                res.status(400).json({ status: "KO", message: "Ce compte n'éxiste pas" });
                break;
            case -2:
                res.status(400).json({ status: "KO", message: "Identifiant ou mot de passe incorrect" });
                break;
        }
    }))

    app.post('/register', cors(), asyncMiddleware(async (req, res) => {
        // let json_req = Object.assign({}, req.body);
        console.log(req.body)
        var result = await Authentification.Authentification_Register(req.body);
        // let usercreated = await Authentification.Authentification_Get_userId(req);
        // let id = {
        //     "userId": usercreated._id
        // };
        switch (result) {
            case 0:
                res.status(200).json({ status: "OK", message: "Compte créé avec succes" });
                break
            case -1:
                res.status(400).json({ status: "KO", message: "Email déjà utilisé pour un autre compte" });
                break;
            case -2:
                res.status(400).json({ status: "KO", message: "Pseudo déjà utilisé pour un autre compte" });
                break;
            case -3:
                res.status(400).json({ status: "KO", message: "Email et Pseudo déjà utilisé pour un autre compte" });
                break;
            case -4:
                res.status(400).json({ status: "KO", message: "Renseigner toutes les informations requises" });
                break;
        }
    }))

    app.get('/logout', cors(), (req, res) => {
        res.send('Welcome to Logout');
    })

    app.post('/forgotpassword', cors(), asyncMiddleware(async (req, res) => {
        var result = await Authentification.Authentification_ForgotPassword(req);

        if (result == -1) {
            res.status(400).json({ status: "KO", message: "Le compte n'existe pas" });
        } else {
            res.status(200).json({ status: "OK", message: "Email de récupération envoyé" });
        }
    })),

        app.post('/resetpassword', cors(), asyncMiddleware(async (req, res) => {
            if (TokenVerify.TokenVerify(req) == -1)
                res.status(400).json({ status: "KO", message: "Invalid Token" });
            else {
                var result = await Authentification.Authentification_ResetPassword(req);

                switch (result) {
                    case 0:
                        res.status(200).json({ status: "OK", message: "Mot de passe modifié" });
                        break;
                    case -1:
                        res.status(400).json({ status: "KO", message: "Renseigner toutes les informations requises" });
                        break;
                    case -2:
                        res.status(400).json({ status: "KO", message: "Mot de passe actuelle incorrect" });
                        break;
                    default:
                        res.status(400).json({ status: "KO", message: "Error" });
                        break;
                }
            }
        })),

        app.post('/userinfo', cors(), asyncMiddleware(async (req, res) => {
            if (TokenVerify.TokenVerify(req) == -1)
                res.status(400).json({ status: "KO", message: "Invalid Token" });
            else {
                var result = await Authentification.Authentification_Get_Info(req);
                res.status(200).json({ status: "OK", email: result.email, pseudo: result.pseudo });
            }
        }))
};