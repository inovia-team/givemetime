'use strict';

var config = require('./config.js').config;
var pg = require('pg');

module.exports.ApiService = function(query, args, cb) {
  const pool = new pg.Pool(config);
  return pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query(query, args, function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      return cb(result.rows.length === 1 ? result.rows[0] : result.rows);
    });
  });
};

module.exports.roundValues = function(row) {
  row.acquired = Math.round(parseInt(row.acquired));
  row.estimate = Math.round(parseInt(row.estimate));
};
