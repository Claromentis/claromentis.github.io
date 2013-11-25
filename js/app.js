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

//Controller
claGitHub.controller('repoController', function ($scope, reposFactory) {

	reposFactory.getRepos().success(function(result){
		$scope.repos = result;
		// console.log(result)
	});

});

// Factory
claGitHub.factory('reposFactory', ['$http', function($http){

	var repos = [];

	repos.getRepos = function() {
		return $http.get('https://api.github.com/users/claromentis/repos');
	};

	return repos;

}]);