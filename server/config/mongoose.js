var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    user = require('../models/User'),
    course = require('../models/Course');

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

    user.seedInitialUsers();
    course.seedInitialCourses();
};