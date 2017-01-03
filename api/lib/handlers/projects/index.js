'use strict';

var ApiService = require('../../ApiService.js').ApiService;
var roundValues = require('../../ApiService.js').roundValues;

module.exports.get = function(req, res, next) {
  const id = req.params.id;
  const amount = req.body.amount;
  const userId = req.body.userId;

  const result = ApiService('SELECT * FROM give_me_time_public.project',
  [],
  (result) => {
    var roundedRes = result.map((row) => {
      roundValues(row)
      return row
    });
    res.send(roundedRes);
  });
};
