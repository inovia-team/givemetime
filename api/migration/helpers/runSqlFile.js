var fs = require('fs');

module.exports = function (db, filePath, cb) {
    console.error("DEOZKDEZOKDZOKDEOZDKEEKODKDDKOEO")
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err,data) {
        if (err) return cb(err);
        console.log('received data: ' + data);
        db.runSql(data, function (err) {
            if (err) return cb(err);
            return cb();
        });
    });
};
