'use strict';

var ApiService = require('../../ApiService.js').ApiService;

module.exports.get = function (req, res, next) {
    ApiService('SELECT * FROM give_me_time_public.project',
    [], next,
    result => {
        if (result.length === 0)
            return res.send(result);
        else if (!result.length) {
            result = [result];
        }
        return res.send(result);
    });
};
