var pg = require('pg');

module.exports = (req, res, next)=>{
    // only trigger when auth infos is present
    if (!req.auth) return next();

    // instantiate a new client
    // the client will read connection information from
    // the same environment variables used by postgres cli tools
    var client = new pg.Client();

    // connect to our database
    client.connect(err=>{
        if (err) throw err;

        // create or retrieve the current user
        client.query('SELECT * from give_me_time_private.person_register_or_retrieve($1, $2)', [req.auth.fullname, req.auth.email], (err, result)=>{
            if (err) throw err;

            // this query always return a user
            req.user = result.rows[0];

            // also refresh credits
            client.query('SELECT give_me_time_public.everybody_gets_credits()', [], (err)=>{
                if (err) throw err;

                // disconnect the client
                client.end(err=>{
                    if (err) throw err;
                });

                next()
            });
        });
    });
};
