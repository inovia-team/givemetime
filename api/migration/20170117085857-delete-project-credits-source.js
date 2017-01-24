var runSqlFile = require('./helpers/runSqlFile.js');
var path = require('path');

exports.up = function (db, callback) {
    var filePath = path.join(__dirname + '/sqls/20170117085857-delete-project-credits-source-up.sql');
    return runSqlFile(db, filePath, callback);
};

exports.down = function (db, callback) {
    var filePath = path.join(__dirname + '/sqls/20170117085857-delete-project-credits-source-down.sql');
    return runSqlFile(db, filePath, callback);
};
