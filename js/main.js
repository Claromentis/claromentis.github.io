var claGitHub = angular.module('claGitHub', []);

//This configures the routes and associates each route with a view and a controller
claGitHub.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'repoController',
                templateUrl: '/partials/project.html'
            })
        .otherwise({ redirectTo: '/partials/project.html' });
});

//Controler
claGitHub.controller('repoController', function ($scope, reposFactory) {
	$scope.repos = reposFactory.repos('https://api.github.com/users/claromentis/repos')
	console.log($scope.repos);
});

//Factory
claGitHub.factory('reposFactory', function($http, $q){
	return {
		repos: function(url){
			var deferred = $q.defer();
			$http.get(url).success(function(data){
				deferred.resolve(data);
			}).error(function(){
				deferred.reject();
			});
			return deferred.promise;
		}
	}

});

