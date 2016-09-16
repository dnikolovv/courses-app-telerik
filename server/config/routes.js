var auth = require('./auth'),
    User = require('mongoose').model('User'),
    UsersController = require('../controllers/UsersController'),
    CoursesController = require('../controllers/CoursesController');

module.exports = function (app) {

    app.get('/partials/:partialArea/:partialName', function (request, response) {
        response.render('../../public/app/' + request.params.partialArea + '/' + request.params.partialName);
    });

    app.post('/api/users', UsersController.signUp);
    app.put('/api/users', auth.isAuthenticated, UsersController.updateUser)
    app.get('/api/users', auth.isInRole('admin'), UsersController.getAllUsers);

    app.get('/api/courses', CoursesController.getAllCourses);
    app.get('/api/courses/:id', CoursesController.getCourseById);

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('*', function (req, res) {
        res.render('index', { currentUser: req.user });
    });
};