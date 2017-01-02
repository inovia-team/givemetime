'use strict';

var config = require('../../config.js').config;
var pg = require('pg');

module.exports.post = function(req, res, next) {
  const id = req.body.userId;
  const title = req.body.title;
  const estimate = req.body.estimate;
  const description = req.body.description;
  var pool = new pg.Pool(config);
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO give_me_time_public.project (author_id, title, estimate, description) VALUES ($1, $2, $3, $4) RETURNING *', [id, title, estimate, description], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
};

module.exports.get = function(req, res, next) {
  const id = req.params.id;
  var pool = new pg.Pool(config);
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM give_me_time_public.project WHERE id=($1)', [parseInt(id)], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      result.rows[0].acquired = Math.round(parseInt(result.rows[0].acquired));
      result.rows[0].estimate = Math.round(parseInt(result.rows[0].estimate));
      res.send(result.rows[0]);
    });
  });
};

module.exports.delete = function(req, res, next) {
  const id = req.params.id;
  var pool = new pg.Pool(config);
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('DELETE FROM give_me_time_public.project WHERE id=($1)', [parseInt(id)], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result.rows[0]);
    });
  });
};
