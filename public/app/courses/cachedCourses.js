app.factory('cachedCourses', function (coursesResource) {

    var cachedCourses;

    return {
        query: function () {
            if (!cachedCourses) {
                cachedCourses = coursesResource.query();
            }

            return cachedCourses;
        }
    }

});