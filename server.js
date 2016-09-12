var port = 3000;

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

var messageSchema = mongoose.Schema({ message: String });

var Message = mongoose.model('Message', messageSchema);
var messageFromDatabase;

Message.remove({}).exec(function (err) {
    if (err) {
        console.log('Messages cannot be cleared: ' + err);
        return;
    }

    Message.create({ message: 'Hi from mongoose' })
        .then(function (model) {
            messageFromDatabase = model.message;
        });
});

app.get('/partials/:partialName', function (request, response) {
    response.render('partials/' + request.params.partialName);
});

app.get('*', function (req, res) {
    res.render('index', {message: messageFromDatabase});
});

app.listen(port);

console.log('Server running on port ' + port);
