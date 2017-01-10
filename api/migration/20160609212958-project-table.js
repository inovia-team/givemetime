var runSqlFile = require('./helpers/runSqlFile.js');
var path = require('path');

exports.up = function (db, callback) {
    var filePath = path.join(__dirname + '/sqls/20160609212958-project-table-up.sql');
    return runSqlFile(db, filePath, callback);
};

exports.down = function (db, callback) {
    var filePath = path.join(__dirname + '/sqls/20160609212958-project-table-down.sql');
    return runSqlFile(db, filePath, callback);
};
