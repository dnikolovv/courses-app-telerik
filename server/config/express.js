var express = require('express'),
    bodyParser = require('body-parser'),
    stylus = require('stylus');

module.exports = function(app, config) {

    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');
    app.use(bodyParser());
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: function (str, path) {
                return stylus(str).set('filename', path);
            }
        }
    ));

    app.use(express.static(config.rootPath + '/public'));
}