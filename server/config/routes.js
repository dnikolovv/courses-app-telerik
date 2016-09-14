var auth = require('./auth');

module.exports = function (app) {

    app.get('/partials/:partialArea/:partialName', function (request, response) {
        response.render('../../public/app/' + request.params.partialArea + '/' + request.params.partialName);
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('*', function (req, res) {
        res.render('index');
    });
};