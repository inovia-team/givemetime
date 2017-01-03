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
  (err, result) => {
    return res.send(err || result);
  });
};

module.exports.get = function(req, res, next) {
  const id = null;

  const result = ApiService('SELECT * FROM give_me_time_public.project WHERE id=($1)',
  [id && parseInt(id)],
  (err, result) => {
    result && roundValues(result);
    return res.send(err || result);
  });
};

module.exports.delete = function(req, res, next) {
  const id = req.params.id;

  const result = ApiService('DELETE FROM give_me_time_public.project WHERE id=($1)',
  [id && parseInt(id)],
  (err, result) => {
    return res.send(err || result);
  });
};
