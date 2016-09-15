var app = angular.module('app', ['ngResource', 'ngRoute'])
    .value('toastr', toastr);

app.config(function ($routeProvider, $locationProvider) {

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                debugger;
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