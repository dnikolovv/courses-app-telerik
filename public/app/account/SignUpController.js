app.controller('SignUpController', function ($scope, $location, auth, notifier) {

    $scope.signUp = function(user) {
        auth.signUp(user).then(function () {
            notifier.success('Successfully registered!');
            $location.path('/');
        })
    }
});