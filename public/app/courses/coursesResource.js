app.factory('coursesResource', function ($resource) {

    var coursesResource = $resource('/api/courses/:id', {_id:  '@id'}, { update: { method: 'PUT', isArray: false }});

    return coursesResource;
});