'use strict';

var ApiService = require('../../ApiService.js').ApiService;
var getUserIdFromToken = require('../../../auth/getIdFromToken.js').getUserIdFromToken;
var error = require('../../config.js').errors;
var async = require('async');


module.exports.post = function (req, res, next) {
    const id = req.body.userId;
    const title = req.body.title;
    const estimate = req.body.estimate;
    const description = req.body.description;

    if (!estimate || !(!isNaN(parseFloat(estimate)) && isFinite(estimate)) || estimate < 0.0) // check that it's a valid and positive value
        return next({ message: error.BAD_AMOUNT });

    ApiService('INSERT INTO give_me_time_public.project (author_id, title, estimate, description) VALUES ($1, $2, $3, $4) RETURNING *',
    [id, title, estimate, description], next,
    result => {
        return res.send(result);
    });
};

module.exports.get = function (req, res, next) {
    const id = req.params.id;

    ApiService('SELECT * FROM give_me_time_public.project WHERE id=($1)',
    [id], next,
    result => {
        if (!result.id)
            return next({ message: error.UNKNOWN_PROJECT });
        return res.send(result);
    });
};

module.exports.delete = function (req, res, next) {
    const id = req.params.id;

    async.waterfall([
        function getID (cb) {
            return getUserIdFromToken(req.headers.authorization, next, cb);
        },
        function checkOwner (userId, cb) {
            ApiService('SELECT * from give_me_time_public.project WHERE id=($1)',
            [id], next,
            result => {
                if (!result.author_id)
                    return next({ message: error.UNKNOWN_PROJECT });
                else if (result.author_id != userId)
                    return next({ message: error.DELETE_NO_RIGHT });
                return cb(null);
            });
        }, function deleteProject (cb) {
            ApiService('DELETE FROM give_me_time_public.project WHERE id=($1) RETURNING id',
            [id], next,
            result => {
                return cb(result);
            });
        },
    ], function (result) {
        return res.send(result);
    });
};
