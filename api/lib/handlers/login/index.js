'use strict';

var ApiService = require('../../ApiService.js').ApiService;

module.exports.post = function(req, res, next) {
  var id = req.body.id;

  const result = ApiService('SELECT * FROM give_me_time_public.person WHERE id=($1)',
  [id],
  (result) => {
    result ? result.credit = Math.round(parseInt(result.credit)) : '';
    res.send(result);
  });
};