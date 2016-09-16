app.controller('CourseDetailsController', function ($scope, cachedCourses, $routeParams) {
    $scope.course = cachedCourses.query().$promise.then(function(collection) {
        collection.forEach(function(course) {
            if (course._id === $routeParams.id) {
                $scope.course = course;
            }
        })
    })
});