'use strict';

var DatabaseService = require('../../DatabaseService.js');
var getAuthorNames = require('../helpers.js').getAuthorNames;

module.exports.get = function (req, res, next) {
    DatabaseService('SELECT * FROM give_me_time_public.project',
    [], next,
    result => {
        if (result.length === 0)
            return res.send(result);
        else if (!result.length) {
            result = [result];
        }
        getAuthorNames(result, result => {
            return res.send(result);
        });
    });
};
