'use strict';

var config = require('../../config.js').config;
var pg = require('pg');

module.exports.post = function(req, res, next) {
  var id = req.body.id;
  var pool = new pg.Pool(config);
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM give_me_time_public.person WHERE id=($1)', [id], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      result.rows[0] ? result.rows[0].credit = Math.round(parseInt(result.rows[0].credit)) : '';
      res.send(result.rows[0]);
    });
  });
}
