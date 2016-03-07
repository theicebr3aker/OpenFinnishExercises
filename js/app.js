(function(){
	var app = angular.module('open-finnish-lang', ['ui.bootstrap', 'ui.router']);
	
	app.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/numbers');
		
		$stateProvider
            .state('numbers', {
                url: '/numbers',
                templateUrl: 'views/numbers.htm'
            })
            .state('partitive', {
                url: '/partitive',
                templateUrl: 'views/partitive.htm',
                controller: 'partitiveController as partCtrl'
            });
	});
	
	app.run(function($rootScope) {
		$rootScope.totalAnswers = 0;
		$rootScope.correctAnswers = 0;
	});
})();
