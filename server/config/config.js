var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/CoursesApp',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:parola123@ds029426.mlab.com:29426/courses-app',
        port: process.env.PORT || 3000
    }
}