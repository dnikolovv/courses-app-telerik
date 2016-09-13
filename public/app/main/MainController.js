app.controller('MainController', function ($scope) {
    $scope.courses = [
        {name: 'C#', featured: true, published: new Date('10/5/2013')},
        {name: 'C++', featured: false, published: new Date('10/5/2013')},
        {name: 'Java', featured: true, published: new Date('10/5/2011')},
        {name: 'Ruby', featured: true, published: new Date('10/5/2012')},
        {name: 'Javascript', featured: false, published: new Date('10/5/2014')}
    ]
});