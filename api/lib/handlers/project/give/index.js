'use strict';

var ApiService = require('../../../ApiService.js').ApiService;
var error = require('../../../config.js').errors;
var async = require('async');

module.exports.post = function(req, res, next) {
  const id = req.params.id;
  const amount = req.body.amount;
  const userId = req.body.userId;

  async.waterfall([
    function checkArguments(cb) {
      if (amount <= 0)
        return cb(error['AMOUNT_INVALID'], null)
      return cb(null);
    },
    function checkUser(cb) {
      const result = ApiService('SELECT * FROM give_me_time_public.person WHERE id=($1)',
      [userId],
      (err, result) => {
        if (!err && !result.id)
          err = error['UNKNOWN_PERSON']
        return cb(err, result)
      });
    },
    function checkProject(resCheck, cb) {
      const result = ApiService('SELECT * FROM give_me_time_public.project WHERE id=($1)',
      [id],
      (err, result) => {
        if (!err && !result.id)
          err = error['UNKNOWN_PROJECT']
        else if (!err && result.estimate - result.acquired < amount)
          err = error['TOO_MUCH_CREDIT']
        else if (!err && parseInt(resCheck.credit) < amount)
          err = error['NOT_ENOUGH_CREDIT'];
        return cb(err, result)
      });
    },
    function updateUser(resCheck, cb) {
      const result = ApiService('UPDATE give_me_time_public.person SET credit=credit-($1) WHERE id=($2)',
      [amount, userId],
      (err, result) => {
        return cb(err, result)
      });
    }, function updateProject(updateRes, cb) {
      const result = ApiService('UPDATE give_me_time_public.project SET acquired=acquired+($1) WHERE id=($2) RETURNING *',
      [amount, id],
      (err, result) => {
        return cb(err, result);
      });
    }
  ], function (err, result) {
    console.log(result)
    return res.send(err || result);
  });
};
