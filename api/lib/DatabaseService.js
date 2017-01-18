'use strict';

var config = require('./config.js').config;
var pg = require('pg');
var error = require('./config.js').errors;
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: 'GiveMeTime' });

function checkArguments (args) { // If one required argument is either null or undefined it should return an error
    for (let i = 0; i < args.length; i++) {
        if (!args[i])
            return false;
    }
    return true;
}

module.exports = function (query, args, next, cb, acceptNull) {
    if (!checkArguments(args) && !acceptNull) {
        log.error(error['ARGUMENT_MISSING']);
        return next({ message: error.ARGUMENT_MISSING });
    }
    const pool = new pg.Pool(config);
    return pool.connect(function (err, client, done) {
        if(err) {
            log.error('error fetching client from pool', err);
            return next({ message: error.DATABASE_ERROR });
        }
        client.query(query, args, function (err, result) {
            done();
            if(err) {
                log.error('error running query', err);
                return next({ message: error.DATABASE_ERROR });
            }
            return cb(result.rows.length === 1 ? result.rows[0] : result.rows);
        });
    });
};
