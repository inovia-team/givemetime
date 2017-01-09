'use strict';

var autoload = require('require-all')({
    dirname: __dirname,
    filter: /^((?!spec.js).)*$/,
});

module.exports = autoload;
