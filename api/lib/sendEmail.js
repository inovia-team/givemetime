const nodemailer = require('@nodemailer/pro');
var bunyan = require('bunyan');

var log = bunyan.createLogger({ name: 'GiveMeTime' });

module.exports = function sendEmail (recipient, title) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'givemetimeTest@gmail.com',
            pass: '', // nope
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
