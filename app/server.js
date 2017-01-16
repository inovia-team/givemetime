const express = require('express')
import { PORT } from './src/config'
const app = express()

// static file serve

app.use(express.static(__dirname + '/build'))
// not found in static files, so default to index.html
app.use((req, res) => res.sendFile(`${__dirname}/build/index.html`))

// eslint-disable-next-line no-console
console.log(`Listening to port ${PORT}`)
app.listen(PORT)
