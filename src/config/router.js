router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default function router($stateProvider, $urlRouterProvider, $locationProvider) {
	// $locationProvider.html5Mode(true);
	$urlRouterProvider.when('', '/login');
	$urlRouterProvider.otherwise('/login');
	$stateProvider
		.state('login', {
			url: '/login',
			views: {
				'mainContent': {
					template: '<login></login>'
				}
			}
		})
}