app.controller('MainController', function ($scope, coursesResource) {

    $scope.courses = coursesResource.query();
});