'use strict';

var DatabaseService = require('../../../DatabaseService.js');
var getUserIdFromToken = require('../../../../auth/getIdFromToken.js').getUserIdFromToken;
var error = require('../../../config.js').errors;
var getUserMailFromId = require('../../helpers.js').getUserMailFromId;
var async = require('async');
var sendEmail = require('../../../sendEmail.js');
var postgresArray = require('postgres-array');

module.exports.post = function (req, res, next) {
    const id = req.params.id;
    const amount = req.body.amount;
    let userId;

    async.waterfall([
        function getID (cb) {
            return getUserIdFromToken(req.headers.authorization, next, cb);
        },
        function checkArguments (userIdRes, cb) {
            userId = userIdRes;
            if (!(!isNaN(parseFloat(amount)) && isFinite(amount)) || amount <= 0)
                return next({ message: error.AMOUNT_INVALID });
            return cb(null);
        },
        function checkUser (cb) {
            DatabaseService('SELECT * FROM give_me_time_public.person WHERE id=($1)',
            [userId], next,
            result => {
                if (!result.id)
                    return next({ message: error.UNKNOWN_PERSON });
                return cb(null, result);
            });
        },
        function checkProject (resCheck, cb) {
            DatabaseService('SELECT * FROM give_me_time_public.project WHERE id=($1)',
            [id], next,
            result => {
                if (!result.id)
                    return next({ message: error.UNKNOWN_PROJECT });
                else if (result.estimate - result.acquired < amount)
                    return next({ message: error.TOO_MUCH_CREDIT });
                else if (parseFloat(resCheck.credit) < amount)
                    return next({ message: error.NOT_ENOUGH_CREDIT });
                return cb(null, result);
            });
        },
        function updateUser (resProject, cb) {
            DatabaseService('UPDATE give_me_time_public.person SET credit=credit-($1) WHERE id=($2)',
            [amount, userId], next,
            () => {
                return cb(null, resProject);
            });
        }, function updateProject (resProject, cb) {
            /*
                If the user never donated to the project, just concat the value to the array
                Else we need to find the index of the array storing the user given credits
                Since there is no object in postgres we made and array of composite type (id, credits)
                We need to parse it to make it JS-usable
                Once the prepared SQL statement has been made, we can just add it to the query
            */
            let i = 0;
            const query = resProject.associate_users && postgresArray.parse(resProject.associate_users).find(user => {
                user = eval(user.replace(/\(/g, '[').replace(/\)/g, ']'));
                i++;
                return user[0] === userId;
            }) ? `associate_users[${i}].credits_amount = associate_users[${i}].credits_amount + ${amount}` : `associate_users = associate_users || '{"(${userId}, ${amount})"}'`;
            DatabaseService(`UPDATE give_me_time_public.project SET acquired=acquired+($1), ${query} WHERE id=($2) RETURNING *`,
            [amount, id], next,
            result => {
                return cb(null, result);
            });
        }, function checkIfCompleted (queryRes, cb) {
            if (queryRes.estimate === queryRes.acquired) {
                async.waterfall([
                    function getMail (cb) {
                        getUserMailFromId(queryRes.author_id, cb);
                    },
                    function sendMail (email, cb) {
                        sendEmail(email, queryRes.title);
                        cb(null);
                    },
                    function sendRes (cb) {
                        cb(queryRes);
                    },
                ], cb(queryRes));
            } else {
                cb(queryRes);
            }
        },
    ], function (result) {
        return res.send(result);
    });
};
