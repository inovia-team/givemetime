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
        return next ({message: error.AMOUNT_INVALID});
      return cb(null);
    },
    function checkUser(cb) {
      const result = ApiService('SELECT * FROM give_me_time_public.person WHERE id=($1)',
      [userId], next,
      (result) => {
        if (!result.id)
          return next ({message: error.UNKNOWN_PERSON});
        return cb(null, result)
      });
    },
    function checkProject(resCheck, cb) {
      const result = ApiService('SELECT * FROM give_me_time_public.project WHERE id=($1)',
      [id], next,
      (result) => {
        if (!result.id)
          return next ({message: error.UNKNOWN_PROJECT});
        else if (result.estimate - result.acquired < amount)
          return next ({message: error.TOO_MUCH_CREDIT});
        else if (resCheck.credit < amount)
          return next ({message: error.NOT_ENOUGH_CREDIT});
        return cb(null);
      });
    },
    function updateUser(cb) {
      const result = ApiService('UPDATE give_me_time_public.person SET credit=credit-($1) WHERE id=($2)',
      [amount, userId], next,
      (result) => {
        return cb(null);
      });
    }, function updateProject(cb) {
      const result = ApiService('UPDATE give_me_time_public.project SET acquired=acquired+($1) WHERE id=($2) RETURNING *',
      [amount, id], next,
      (result) => {
        return cb(result);
      });
    }
  ], function (result) {
    return res.send(result);
  });
};
