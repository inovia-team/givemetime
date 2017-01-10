const google = require('googleapis');
const plus = google.plus('v1');
const OAuth2 = google.auth.OAuth2;

// @TODO: find another way to pass the client secret
const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

/* Get user name and email from OAuth login */

module.exports = (req, res, next)=>{
    // impersonate user using his credentials
    oauth2Client.setCredentials({
        access_token: req.body.access_token,
    });

    // ask google for user infos
    plus.people.get({ userId: 'me', auth: oauth2Client }, (err, response)=>{
        if (err) return next(err);

        // add auth info to the request
        req.avatar = response.image.url;
        req.auth = {
            fullname: response.displayName,
            email: response.emails
                .filter(emailObj => emailObj.type === 'account')
                .map(emailObj => emailObj.value)
                .shift(),
        };
        return next(); // returns user infos
    });
};
