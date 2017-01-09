const ApiService = require('../lib/ApiService.js').ApiService;

module.exports = (req, res, next)=>{
    // only trigger when auth infos is present
    if (!req.auth) return next();

    ApiService('SELECT * from give_me_time_private.person_register_or_retrieve($1, $2)',
        [req.auth.fullname, req.auth.email], next,
        result => {
            req.user = result;
            ApiService('SELECT give_me_time_public.everybody_gets_credits()',
                [], next,
                () => {
                    next();
                });
        });
};
