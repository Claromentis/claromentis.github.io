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
	reposFactory.getTags().success(function(data){
		$scope.repoTags = data;
		console.log($scope.repoTags)
	})
});

//Factory
claGitHub.factory('reposFactory', function($http){

	var reposUrl = 'https://api.github.com/users/claromentis/repos';

	return {
		getRepos : function() {
			return $http({
				url: reposUrl,
				method: 'GET'
			});
		},
		getTags : function() {
			return $http({
				url: reposUrl,
				method: 'GET'
			}).success(function(data){
				for(var i=0; i<data.length; i++){
					var repoTags = [];
					$http({
						url: data[i].tags_url,
						method: 'GET'
					}).success(function(data){
						repoTags.push(data);
					})
				}
				
			});
		}
	};
});