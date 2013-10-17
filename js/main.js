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
	$scope.repos = reposFactory;
});

//Factory
claGitHub.factory('reposFactory', function($http){

	var repos = {
		content:null
	};

	$http.get('https://api.github.com/users/claromentis/repos').success(function(data){
		repos.content = data;
	});

	return repos;

});

