const PORT = process.env.PORT || 8080;
module.exports.PORT = PORT;
module.exports.API_URL = (process.env.API_URL || 'http://localhost') + ':' + PORT;
module.exports.GOOGLE_KEY = process.env.GOOGLE_CLIENT_ID

// eslint-disable-next-line
module.exports.errorMiddleware = function (err, req, res, next) {
    log.error('ERROR : ', err);
    res.status(err.status || 500);
    res.json({ error: err });
};