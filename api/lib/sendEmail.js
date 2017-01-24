const nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var bunyan = require('bunyan');

var log = bunyan.createLogger({ name: 'GiveMeTime' });

module.exports = function sendEmail (recipient, title) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: 'givemetimeTest@gmail.com',
                type: 'OAuth2',
                clientId: process.env.MAIL_CLIENT_ID,
                clientSecret: process.env.MAIL_CLIENT_SECRET,
                expires: 1485274955262,
                refreshToken: '1/Tbk1UYgmgtdYu6MJ-ZUy82HkqOvVKA7wHjbpMaOClZk',
                accessToken: 'ya29.GlvdA1Z5pT0st9Htx066O_39mqVurBvO_Rm8gCFu8nFqhfd_53Kfu9TPmNPAJra7jSRQHzRPOl1380DW9YsCb9pqa5KzL8daCMKSSUJ2d6HX79Fc9fqOSnTHkGOU',
            }),
        },
    });

    let mailOptions = {
        from: '"GiveMeTime 👻" <givemetime@inovia-team.com>', // sender address
        to: recipient, // list of receivers
        subject: 'Congratulation', // Subject line
        text: `Your project ${title} has reached the needed amount to get started !`, // plain text body
        html: `<b>Your project ${title} has reached the needed amount to get started !</b>`, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return log.error(error);
        }
        log.info('Message %s sent: %s', info.messageId, info.response);
    });
};
