var auth = require('./auth'),
    User = require('mongoose').model('User');

module.exports = function (app) {

    app.get('/partials/:partialArea/:partialName', function (request, response) {
        response.render('../../public/app/' + request.params.partialArea + '/' + request.params.partialName);
    });

    app.get('/api/users', auth.isInRole('admin'),
        function(req, res) {
            User.find({}).exec(function (err, users) {
                if (err) {
                    console.log("Couldn't obtain users: " + err);
                }

                res.send(users);
            })
        });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('*', function (req, res) {
        res.render('index', { currentUser: req.user });
    });
};