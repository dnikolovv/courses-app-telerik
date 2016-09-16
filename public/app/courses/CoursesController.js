app.controller('CoursesController', function ($scope, cachedCourses) {
    $scope.courses = cachedCourses.query();
});