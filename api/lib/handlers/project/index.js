'use strict';

var ApiService = require('../../ApiService.js').ApiService;
var roundValues = require('../../ApiService.js').roundValues;
var error = require('../../config.js').errors;
var async = require('async');

module.exports.post = function(req, res, next) {
  const id = req.body.userId;
  const title = req.body.title;
  const estimate = req.body.estimate;
  const description = req.body.description;

  const result = ApiService('INSERT INTO give_me_time_public.project (author_id, title, estimate, description) VALUES ($1, $2, $3, $4) RETURNING *',
  [id, title, estimate, description],
  (err, result) => {
    result && roundValues(result);
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
  let id = req.params.id;
  const userId = req.headers.userid;
  id = id && parseInt(id);

  async.waterfall([
    function checkOwner(cb) {
      const result = ApiService('SELECT * from give_me_time_public.project WHERE id=($1)',
      [id],
      (err, result) => {
        if (!err && result.author_id != userId)
          err = error['DELETE_NO_RIGHT']
        return cb(err, result)
      });
    }, function deleteProject(resultCheck, cb) {
      const result = ApiService('DELETE FROM give_me_time_public.project WHERE id=($1)',
      [id],
      (err, result) => {
        return cb(err, result);
      });
    }
  ], function (err, result) {
    return res.send(err || result);
  })
};
