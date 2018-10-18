router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default function router($stateProvider, $urlRouterProvider, $locationProvider) {
	// $locationProvider.html5Mode(true);
	$urlRouterProvider.when('', '/demo');
	$urlRouterProvider.otherwise('/demo');
}