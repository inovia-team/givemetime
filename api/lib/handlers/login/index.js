'use strict';

var DatabaseService = require('../../DatabaseService.js');

module.exports.post = function (req, res, next) {
    var id = req.body.id;

    DatabaseService('SELECT * FROM give_me_time_public.person WHERE id=($1)',
    [id], next,
    result => {
        result.credit = Math.round(result.credit);
        return res.send(result);
    });
};
