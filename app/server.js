const express = require('express')
const PORT = require('./src/config').PORT
const app = express()

// static file serve

app.use(express.static('build'))
app.use(express.static('assets'))
// not found in static files, so default to index.html
app.use(function (req, res) { return res.sendFile(__dirname + '/build/index.html') })

// eslint-disable-next-line no-console
console.log('Listening to port ' + PORT)
app.listen(PORT)

module.exports = app