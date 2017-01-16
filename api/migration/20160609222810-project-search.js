var runSqlFile = require('./helpers/runSqlFile.js');
var path = require('path');

exports.up = function (db, callback) {
    var filePath = path.join(__dirname + '/sqls/20160609222810-project-search-up.sql');
    return runSqlFile(db, filePath, callback);
};

exports.down = function (db, callback) {
    var filePath = path.join(__dirname + '/sqls/20160609222810-project-search-down.sql');
    return runSqlFile(db, filePath, callback);
};
