const PORT = process.env.PORT || 8080
const API_PORT = process.env.API_PORT || 3000
module.exports.PORT = PORT
module.exports.API_PORT = API_PORT
module.exports.API_URL = (process.env.API_URL || 'http://localhost') + ':' + API_PORT
module.exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
module.exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
module.exports.GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL