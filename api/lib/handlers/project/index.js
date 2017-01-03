'use strict';

var ApiService = require('../../ApiService.js').ApiService;
var roundValues = require('../../ApiService.js').roundValues;

module.exports.post = function(req, res, next) {
  const id = req.body.userId;
  const title = req.body.title;
  const estimate = req.body.estimate;
  const description = req.body.description;

  const result = ApiService('SELECT give_me_time_public.project_create($1, $2, $3, $4)',
  [id, title, estimate, description],
  (err, result) => {
    return res.send(err || result);
  });
};

module.exports.get = function(req, res, next) {
  const id = req.params.id;

  const result = ApiService('SELECT * FROM give_me_time_public.project WHERE id=($1)',
  [id && parseInt(id)],
  (err, result) => {
    result && roundValues(result);
    return res.send(err || result);
  });
};

module.exports.delete = function(req, res, next) {
  const id = req.params.id;
  const userId = req.headers.userid;

  const result = ApiService('SELECT give_me_time_public.project_delete($1, $2)',
  [id && parseInt(id), userId],
  (err, result) => {
    return res.send(err || result);
  });
};
