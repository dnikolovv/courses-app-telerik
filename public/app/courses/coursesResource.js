app.factory('coursesResource', function ($resource) {

    var coursesResource = $resource('/api/courses/:id', { id: '@id' }, { update: { method: 'PUT', isArray: false }});

    return coursesResource;
});