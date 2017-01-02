var jwt = require('jsonwebtoken');

module.exports = jwtSecret => (req, res, next) => {
    if (!req.user) return next();

    var token = jwt.sign({
        user_rowId: req.user.id,
        user_id: req.user.id,
        aud: 'postgraphql',
        role: 'give_me_time_user',
    }, jwtSecret);

    res.json({
        user_rowId: req.user.id,
        user_id: req.user.id,
        token
    })

    next();
};
