app.controller('UsersListController', function ($scope, usersResource) {
    $scope.users = usersResource.query();
});