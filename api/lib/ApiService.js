'use strict';

var config = require('./config.js').config;
var pg = require('pg');
var error = require('./config.js').errors;

function checkArguments(args) {
  for (let i = 0; i < args.length; i++) {
    if (!args[i])
      return false;
  }
  return true;
}

module.exports.ApiService = function(query, args, cb) {
  if (!checkArguments(args)) {
    console.error(error['ARGUMENT_MISSING']);
    return cb(error['ARGUMENT_MISSING'], null)
  }
  const pool = new pg.Pool(config);
  return pool.connect(function(err, client, done) {
    if(err) {
      console.error('error fetching client from pool', err);
      return cb(error['DATABASE_ERROR'], null);
    }
    client.query(query, args, function(err, result) {
      done();
      if(err) {
        console.error('error running query', err);
        return cb(error['DATABASE_ERROR'], null);
      }
      return cb(null, result.rows.length === 1 ? result.rows[0] : result.rows);
    });
  });
};
