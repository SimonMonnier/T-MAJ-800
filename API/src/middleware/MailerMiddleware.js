const nodemailer = require("nodemailer");
// const { google } = require('googleapis');

// const fs = require('fs');
// const fileName = '../../config/config.json';
// const file = require(fileName);

// const oauth2Client = new google.auth.OAuth2(
//     global.gConfig.MAILER_OAUTH_CLIENT_ID,
//     global.gConfig.MAILER_CLIENT_SECRET,
//     global.gConfig.MAILER_OAUTH_REDIRECT_URL
// );


async function Mailler_ForgotPasswordEmail(req, compte, generatePassword) {
    // oauth2Client.credentials.refresh_token = global.gConfig.MAILER_REFRESH_TOKEN;

    // oauth2Client.refreshAccessToken((error, tokens) => {
    //     if (!error) {
    //         file.Mailler.MAILER_ACCES_TOKEN = tokens.access_token;

    //         fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
    //             if (err) return console.log(err);
    //             console.log(JSON.stringify(file));
    //             console.log('writing to ' + fileName);
    //         });
    //     } else {
    //         // const getToken = async () => {

    //         //     const { tokens } = await oauth2Client.getToken(global.gConfig.MAILER_CODE);

    //         //     console.info(tokens);

    //         // };

    //         // getToken()

    //         const GMAIL_SCOPES = [
    //             'https://mail.google.com/',
    //             'https://www.googleapis.com/auth/gmail.modify',
    //             'https://www.googleapis.com/auth/gmail.compose',
    //             'https://www.googleapis.com/auth/gmail.send',
    //         ];

    //         const url = oauth2Client.generateAuthUrl({
    //             access_type: 'offline',
    //             scope: GMAIL_SCOPES,
    //         });

    //         console.info(`authUrl: ${url}`);
    //     }
    // })

    // const getToken = async () => {

    //     const { tokens } = await oauth2Client.getToken(global.gConfig.MAILER_CODE);

    //     console.info(tokens);
    // };

    // getToken()


    // let transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     secure: true,
    //     auth: {
    //         type: 'OAuth2',
    //         user: global.gConfig.Mailler_Email,
    //         pass: global.gConfig.Mailler_Password,
    //         clientId: global.gConfig.MAILER_OAUTH_CLIENT_ID,
    //         clientSecret: global.gConfig.MAILER_CLIENT_SECRET,
    //         refreshToken: global.gConfig.MAILER_REFRESH_TOKEN,
    //         accessToken: global.gConfig.MAILER_ACCESS_TOKEN,
    //         expires: Number.parseInt(global.gConfig.MAILER_EXPIRATION_DATE, 10),
    //     },
    //     tls: { rejectUnauthorized: false }
    // });

    let transporter = nodemailer.createTransport({
        service: "gmail",
        // secure: true,
        auth: {
            user: global.gConfig.Mailler_Email,
            pass: global.gConfig.Mailler_Password,
        },
        tls: { rejectUnauthorized: false }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"KiwiGram" <KiwiGram.app.epitech@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Email de récupération de mot de passe", // Subject line
        text: "Bonjour " + compte.pseudo + ", Une demande de modification de votre mot de passe à été éffectué,  Voici Votre nouveau mot de passe :" + generatePassword + "Veuillez réinitialiser votre mot de passe dès votre connexion! Si vous n'êtes pas l'auteur de cette demande veuillez contacter le support le plus rapidement possible", // plain text body
        html: "Bonjour <b>" + compte.pseudo + "<br></b><br>Une demande de modification de votre mot de passe à été éffectué, <br><br>Voici Votre nouveau mot de passe :<br><b><pre>" + generatePassword + "</pre></b><br><b><u> Veuillez réinitialiser votre mot de passe dès votre connexion!</u></b><br><br><u>Si vous n'êtes pas l'auteur de cette demande veuillez contacter le support le plus rapidement possible</u>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
}


module.exports = {
    Mailler_ForgotPasswordEmail
}