app.controller('ProfileController', function ($scope, identity, auth, $location) {
    $scope.user = {
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName
    };

    $scope.update = function (user) {
        auth.update(user).then(function () {
           $scope.firstName = user.firstName;
           $scope.lastName = user.lastName;
           $location.path('/');
        });
    }
});