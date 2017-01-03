'use strict';

var ApiService = require('../../ApiService.js').ApiService;
var roundValues = require('../../ApiService.js').roundValues;

module.exports.post = function(req, res, next) {
  const id = req.body.userId;
  const title = req.body.title;
  const estimate = req.body.estimate;
  const description = req.body.description;

  const result = ApiService('INSERT INTO give_me_time_public.project (author_id, title, estimate, description) VALUES ($1, $2, $3, $4) RETURNING *',
  [id, title, estimate, description],
  (result) => {
    res.send(result);
  });
};

module.exports.get = function(req, res, next) {
  const id = req.params.id;

  const result = ApiService('SELECT * FROM give_me_time_public.project WHERE id=($1)',
  [parseInt(id)],
  (result) => {
    roundValues(result);
    res.send(result);
  });
};

module.exports.delete = function(req, res, next) {
  const id = req.params.id;

  const result = ApiService('DELETE FROM give_me_time_public.project WHERE id=($1)',
  [parseInt(id)],
  (result) => {
    res.send(result);
  });
};
