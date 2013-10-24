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
claGitHub.controller('repoController', function ($scope, $http, reposFactory) {
	reposFactory.getRepos().success(function(data){
		$scope.repos = data;
	});
});

//Factory
claGitHub.factory('reposFactory', function($http){
	return {
		getRepos : function() {
			return $http({
				url: 'https://api.github.com/users/claromentis/repos',
				method: 'GET'
			});
		}
	};
});

