const DatabaseService = require('../lib/DatabaseService.js');

module.exports = (req, res, next)=>{
    // only trigger when auth infos is present
    if (!req.auth) return next();

    DatabaseService('SELECT * from give_me_time_private.person_register_or_retrieve($1, $2)', // Get a person from his name and unique email
        [req.auth.fullname, req.auth.email], next,
        result => {
            req.user = result;
            DatabaseService('SELECT give_me_time_public.everybody_gets_credits()', // If person exists update his current credits
                [], next,
                () => {
                    return next();
                });
        });
};
