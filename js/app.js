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

		$scope.repos = reposFactory.getRepos();
		console.log($scope.repos);

});

// Factory
claGitHub.factory('reposFactory', ['$http', function($http){

    var repos = {};

    repos.getRepos = function() {
        return $http.get('https://api.github.com/users/claromentis/repos')
        .then(function(resp) {
          return resp.data.map(function(repo) {
            $http.get(repo.tags_url).then(function(resp) {
              repo.tags = resp.data;
            });
            return repo;
          });
        });

    };

    return repos;

}]);