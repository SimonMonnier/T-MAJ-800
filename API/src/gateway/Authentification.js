const crypto = require('crypto')
const UserSchema = require('../schema/UserSchema');
const { TokenGetInfo } = require('./TokenVerify');
const MailerMiddleware = require('../../src/middleware/MailerMiddleware');

async function Authentification_Register(req) {
    var requestdb = UserSchema.UserSchema;
    var result = 0;
    console.log(req.body);
    if (req.email == null || req.password == null || req.pseudo == null) {
        return -4;
    }
    if (req.email == "" || req.password == "" || req.pseudo == "") {
        return -4;
    }

    // Crypto Password
    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(req.password, salt, 1000, 64, `sha512`).toString(`hex`);
    console.log(hash);
    //

    await requestdb.create({
        email: req.email,
        hash: hash,
        salt: salt,
        pseudo: req.pseudo,
    }).then(function (data) {
        result = 0;
    }).catch(function (err) {
        console.log(err);
        if (err.keyPattern.email === 1)
            result = -1;
        if (err.keyPattern.pseudo === 1)
            result = -2;
        if (err.keyPattern.email === 1 && err.keyPattern.pseudo === 1)
            result = -3;
    });
    return result;
}

async function Authentification_Login(req) {
    var requestdb = UserSchema.UserSchema;

    return await requestdb.findOne({ email: req.body.email })
}

async function Authentification_ResetPassword(req) {
    var requestdb = UserSchema.UserSchema;
    console.log(req.body);

    if (req.body.password == null || req.body.newpassword == null) {
        return -1;
    }
    if (req.body.password == "" || req.body.newpassword == "") {
        return -1;
    }

    var userconnected = TokenGetInfo(req);
    var user = await requestdb.findOne({ email: userconnected.email });
    var prev_hash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, `sha512`).toString(`hex`);

    if (user.hash != prev_hash) {
        return -2;
    } else {
        var salt = crypto.randomBytes(16).toString('hex');
        var hash = crypto.pbkdf2Sync(req.body.newpassword, salt, 1000, 64, `sha512`).toString(`hex`);

        await requestdb.updateOne({ email: user.email }, { $set: { "hash": hash, "salt": salt } });
        return 0;
    }
}

async function Authentification_ForgotPassword(req) {
    var requestdb = UserSchema.UserSchema;

    const generatePassword = (
        length = 20,
        wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
    ) =>
        Array.from(crypto.randomFillSync(new Uint32Array(length)))
            .map((x) => wishlist[x % wishlist.length])
            .join('')

    var NewPassword = generatePassword()

    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(NewPassword, salt, 1000, 64, `sha512`).toString(`hex`);

    var status = await requestdb.updateOne({ email: req.body.email }, { $set: { "hash": hash, "salt": salt } });

    status = await requestdb.findOne({ email: req.body.email });

    if (status == null) {
        return -1
    } else {
        await MailerMiddleware.Mailler_ForgotPasswordEmail(req, status, NewPassword);
        return 0;
    }
}

async function Authentification_Get_Info(req) {
    var requestdb = UserSchema.UserSchema;
    var userconnected = TokenGetInfo(req);

    return await requestdb.findOne({ email: userconnected.email });
}

async function Authentification_Get_userId(req) {
    var requestdb = UserSchema.UserSchema;

    return await requestdb.findOne({ email: req.body.email });
}

module.exports = {
    Authentification_Register,
    Authentification_Login,
    Authentification_ResetPassword,
    Authentification_ForgotPassword,
    Authentification_Get_Info,
    Authentification_Get_userId,
};