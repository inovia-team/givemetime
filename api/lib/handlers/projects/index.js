'use strict';

var config = require('../../config.js').config;
var pg = require('pg');

module.exports.get = function(req, res, next) {
  var pool = new pg.Pool(config);
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM give_me_time_public.project', [], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      var roundedRes = result.rows.map((row) => {
          row.acquired = Math.round(parseInt(row.acquired));
          row.estimate = Math.round(parseInt(row.estimate));
          return row
      });
      res.send(roundedRes);
    });
  });
};
