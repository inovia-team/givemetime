const google = require('googleapis');
const DatabaseService = require('../lib/DatabaseService.js');
const plus = google.plus('v1');
const OAuth2 = google.auth.OAuth2;

/* Get the corresponding ID from a known user by his name and unique email*/

module.exports.getUserIdFromToken = function (token, next, cb) {

    if (process.env.GOOGLE_AUTH_MOCK)
        return cb(null, token === 'uTest' ? 2 : 1); // Return only user in test mode

    const oauth2Client = new OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URL
    );

    // impersonate user using his credentials
    oauth2Client.setCredentials({
        access_token: token,
    });

    plus.people.get({ userId: 'me', auth: oauth2Client }, (err, response)=>{
        if (err) return next(err);

        DatabaseService('SELECT * from give_me_time_private.person_register_or_retrieve($1, $2)',
            [response.displayName, response.emails
                .filter(emailObj => emailObj.type === 'account')
                .map(emailObj => emailObj.value)
                .shift()], next,
            result => {
                return cb(null, result.id); // return user ID
            });
    });
};
