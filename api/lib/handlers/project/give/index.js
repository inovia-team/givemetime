'use strict';

var config = require('../../../config.js').config;
var pg = require('pg');

module.exports.post = function(req, res, next) {
  const id = req.params.id;
  const amount = req.body.amount;
  const userId = req.body.userId;
  var pool = new pg.Pool(config);
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT give_me_time_public.project_give_time ($1, $2, $3)', [userId, id, amount], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
};
