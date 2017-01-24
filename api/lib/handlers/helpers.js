'use strict';

var DatabaseService = require('../DatabaseService.js');

// get Authors name from IDs

module.exports = function (rawResult, next) {
    var tempArray = [];

    rawResult.constructor !== Array ? rawResult = [rawResult] : rawResult;
    rawResult.map(row => {
        tempArray.push(row.author_id);
    });
    DatabaseService('SELECT * FROM give_me_time_public.person WHERE id=ANY($1::int[])',
    [tempArray], next,
    result => {
        result.constructor !== Array ? result = [result] : result;
        rawResult.map(row => {
            result.map(res => {
                if (res.id === row.author_id) {
                    row.author = res.fullname;
                }
            });
        });
        next(rawResult.length === 1 ? rawResult[0] : rawResult);
    });
};
