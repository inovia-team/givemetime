var jwt = require('jsonwebtoken');
var toID = require('postgraphql/dist/graphql/types').toID

module.exports = jwtSecret => (req, res, next) => {
    if (!req.user) return next();

    var token = jwt.sign({
        user_id: req.user.id,
        aud: 'postgraphql',
        role: 'give_me_time_user',
    }, jwtSecret);

    res.json({
        user_id: req.user.id,
        token
    })

    next();
};
