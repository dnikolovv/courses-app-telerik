module.exports = function (app) {

    app.get('/partials/:partialArea/:partialName', function (request, response) {
        response.render('../../public/app/' + request.params.partialArea + '/' + request.params.partialName);
    });

    app.get('*', function (req, res) {
        res.render('index');
    });
};