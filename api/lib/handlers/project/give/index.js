'use strict';

var ApiService = require('../../../ApiService.js').ApiService;

module.exports.post = function(req, res, next) {
  const id = req.params.id;
  const amount = req.body.amount;
  const userId = req.body.userId;

  const result = ApiService('SELECT give_me_time_public.project_give_time ($1, $2, $3)',
  [userId, id, amount],
  (result) => {
    res.send(result);
  });
};
