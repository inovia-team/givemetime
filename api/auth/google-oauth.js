const google = require('googleapis');
const plus = google.plus('v1');
const OAuth2 = google.auth.OAuth2;

// @TODO: find another way to pass the client secret
const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

module.exports = (req, res, next)=>{
    // impersonate user using his credentials
    oauth2Client.setCredentials({
        access_token: req.body.access_token,
    });

    // ask google for user infos
    plus.people.get({ userId: 'me', auth: oauth2Client }, (err, response)=>{
        if (err) throw err;
        // add auth info to the request
        req.auth = {
            fullname: response.displayName,
            email: response.emails
                .filter(emailObj => emailObj.type === 'account')
                .map(emailObj => emailObj.value)
                .shift()
        };
        next();
    });
};
