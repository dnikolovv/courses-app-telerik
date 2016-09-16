var app = angular.module('app', ['ngResource', 'ngRoute'])
    .value('toastr', toastr);

app.config(function ($routeProvider, $locationProvider) {

    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainController'
        })
        .when('/courses', {
            templateUrl: '/partials/courses/courses-list',
            controller: 'CoursesController'
        })
        .when('/courses/:id', {
            templateUrl: '/partials/courses/course-details',
            controller: 'CourseDetailsController'
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignUpController'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileController',
            resolve: routeUserChecks.authenticated
        })
        .when('/admin/users', {
            templateUrl: 'partials/admin/users-list',
            controller: 'UsersListController',
            resolve: routeUserChecks.adminRole
        });
});

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
        debugger;
        if (rejection === 'unauthorized') {
            $location.path('/');
        }
    })
});