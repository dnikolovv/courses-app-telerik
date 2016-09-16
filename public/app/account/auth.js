app.factory('auth', function ($http, $q, identity, usersResource) {
    return {

        signUp: function(user) {

            var newUser = new usersResource(user);
            var deferred = $q.defer();

            newUser.$save().then(function () {
                identity.currentUser = newUser;
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        },

        update: function(user) {

            var deferred = $q.defer();

            var updatedUser = new usersResource(user);
            updatedUser._id = identity.currentUser._id;

            updatedUser.$update().then(function () {
                identity.currentUser.firstName = updatedUser.firstName;
                identity.currentUser.lastName = updatedUser.lastName;
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        },

        login: function(user){
            var deferred = $q.defer();

            $http.post('/login', user).success(function(response) {
                if (response.success) {
                    var user = new usersResource();
                    angular.extend(user, response.user);
                    identity.currentUser = user;
                    deferred.resolve(true);
                }
                else {
                    deferred.resolve(false);
                }
            });

            return deferred.promise;
        },

        logout: function () {

            var deferred = $q.defer();

            $http.post('/logout').success(function (response) {
                identity.currentUser = undefined;
                deferred.resolve(true);
            });

            return deferred.promise;
        },

        isAuthenticated: function() {
            if (identity.isAuthenticated()) {
                return true;
            }

            return $q.reject('unauthorized');
        },

        isAuthorizedForRole: function(role) {

            if (identity.isAuthorizedForRole(role)) {
                return true;
            }
            else {
                return $q.reject('unauthorized');
            }
        }
    }
});