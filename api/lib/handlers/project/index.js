'use strict';

var DatabaseService = require('../../DatabaseService.js');
var getUserIdFromToken = require('../../../auth/getIdFromToken.js').getUserIdFromToken;
var error = require('../../config.js').errors;
var getAuthorNames = require('../helpers.js');
var async = require('async');
var postgresArray = require('postgres-array');

module.exports.post = function (req, res, next) {
    const id = req.body.userId;
    const title = req.body.title;
    const estimate = req.body.estimate;
    const description = req.body.description;

    if (!estimate || !(!isNaN(parseFloat(estimate)) && isFinite(estimate)) || estimate < 0.0) // check that it's a valid and positive value
        return next({ message: error.BAD_AMOUNT });

    DatabaseService('INSERT INTO give_me_time_public.project (author_id, title, estimate, description) VALUES ($1, $2, $3, $4) RETURNING *',
    [id, title, estimate, description], next,
    result => {
        getAuthorNames(result, result => {
            return res.send(result);
        });
    });
};

module.exports.get = function (req, res, next) {
    const id = req.params.id;

    DatabaseService('SELECT * FROM give_me_time_public.project WHERE id=($1)',
    [id], next,
    result => {
        if (!result.id)
            return next({ message: error.UNKNOWN_PROJECT });
        getAuthorNames(result, result => {
            return res.send(result);
        });
    });
};

module.exports.delete = function (req, res, next) {
    const id = req.params.id;

    async.waterfall([
        function getID (cb) {
            return getUserIdFromToken(req.headers.authorization, next, cb);
        },
        function checkOwner (userId, cb) {
            DatabaseService('SELECT * from give_me_time_public.project WHERE id=($1)',
            [id], next,
            result => {
                if (!result.author_id)
                    return next({ message: error.UNKNOWN_PROJECT });
                else if (result.author_id != userId)
                    return next({ message: error.DELETE_NO_RIGHT });
                return cb(null, userId, result);
            });
        }, function giveBackCredits (userId, resProject, cb) {
            /*
                If a project get deleted we need to give back the credits to their users
                Since there is no object in postgres we made and array of composite type (id, credits)
                We need to parse it to make it JS-usable
            */
            const parsedArray = postgresArray.parse(resProject.associate_users);
            resProject.associate_users && parsedArray.map((user, index) => {
                user = eval(user.replace(/\(/g, '[').replace(/\)/g, ']'));
                DatabaseService('UPDATE give_me_time_public.person SET credit=credit+($1) WHERE id=($2) RETURNING *',
                [user[1], user[0]], next,
                result => {
                    const newCredits = result.id === userId ? result.credit : null; // Store the project owner credits to refresh the state
                    if (index + 1 === parsedArray.length)
                        return cb(null, newCredits); // call cb when we went through all the array
                });
            });
        }, function deleteProject (newCredits, cb) {
            DatabaseService('DELETE FROM give_me_time_public.project WHERE id=($1) RETURNING id',
            [id], next,
            result => {
                if (newCredits)
                    result.newCredits = newCredits;
                return cb(result);
            });
        },
    ], function (result) {
        return res.send(result);
    });
};
