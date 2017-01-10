'use strict';

var DatabaseService = require('../../DatabaseService.js');
var GoogleOAuth = require('../../../auth/google-oauth.js');
var async = require('async');

module.exports.post = function (req, res, next) {
    var id = req.body.id;
    var avatarContainer = { body: { access_token: req.headers.authorization } };

    async.waterfall([
        function getAvatar (cb) {
            process.env.GOOGLE_AUTH_MOCK ? cb(null) : GoogleOAuth(avatarContainer, null, cb);
        },
        function getUser (cb) {
            DatabaseService('SELECT * FROM give_me_time_public.person WHERE id=($1)',
            [id], next,
            result => {
                result.credit = Math.round(result.credit);
                result.avatar = avatarContainer.avatar;
                return cb(result);
            });
        },
    ], result => {
        res.send(result);
    });
};
