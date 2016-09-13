var mongoose = require('mongoose');

module.exports = function (config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.on('open', function (err) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Database running smoothly')
    });
};