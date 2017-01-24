const nodemailer = require('@nodemailer/pro');
var bunyan = require('bunyan');

var log = bunyan.createLogger({ name: 'GiveMeTime' });

module.exports = function sendEmail (mailOptions) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'givemetimeTest@gmail.com',
            pass: '', // nope
        },
    });

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return log.error(error);
        }
        log.info('Message %s sent: %s', info.messageId, info.response);
    });
};
