app.controller('LoginController', function ($scope, $location, notifier, auth, identity) {

    $scope.identity = identity;

    $scope.login = function (user) {
        auth.login(user).then(function (success) {

            if(success) {
                notifier.success('Successful login!');
            }
            else {
                notifier.error('Username/Password incorrect.');
            }
        });
    };

    $scope.logout = function () {
        auth.logout().then(function (success) {
            notifier.success('Successful logout.');
            $location.path('/');
        });
    };
});