var port = process.env.PORT || 3000;

var env = process.env.NODE_ENV || 'development';

var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');
app.use(bodyParser());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: function (str, path) {
            return stylus(str).set('filename', path);
        }
    }
));

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/CoursesApp');

var db = mongoose.connection;

db.on('open', function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Database running smoothly')
});

app.get('/partials/:partialArea/:partialName', function (request, response) {
    response.render('partials/' + request.params.partialArea + '/' + request.params.partialName);
});

app.get('*', function (req, res) {
    res.render('index');
});

app.listen(port);

console.log('Server running on port ' + port);
