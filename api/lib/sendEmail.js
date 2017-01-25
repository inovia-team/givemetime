const nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var bunyan = require('bunyan');
var mailConfig = require('./config.js').mailConfig;
var errors = require('./config.js').errors;

var log = bunyan.createLogger({ name: 'GiveMeTime' });

module.exports = function sendEmail (recipient, title, cb) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator(mailConfig),
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
            log.error(error);
            return cb({ message: errors.MAIL_ERROR });
        }
        log.info('Message %s sent: %s', info.messageId, info.response);
        return cb(null);
    });
};
