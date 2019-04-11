// import sortableListHtml from './sortableList.html';
// import sortableListCtrl from './sortableList.ctrl';
import './sortable.less'
router.$inject = ['$stateProvider']

export default function router($stateProvider) {
	$stateProvider
		// .state('sortableList', {
		// 	url: '/sortableList',
		// 	views: {
		// 		mainContent: {
		// 			template: sortableListHtml,
		// 			controller: sortableListCtrl
		// 		}
		// 	}
		// })
		.state('sortableList', {
			url: '/sortableList',
			views: {
				mainContent: {
					templateProvider: ['$q', function($q) {
						let deferred = $q.defer();
						require.ensure(['./sortableList.html'], function(require) {
							var template = require('./sortableList.html');
							deferred.resolve(template)
						}, 'sortableList-tpl');
						return deferred.promise;
					}],
					controller: 'sortableListCtrl'
				}
			},
			resolve: {
				sortableList: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
					var deferred = $q.defer();
					require.ensure(['./sortableList.ctrl'], function() {
						var module = require('./sortableList.ctrl');
						$ocLazyLoad.load({
							name: 'sortableList'
						});
						deferred.resolve(module.controller);					
					}, 'sortableList-ctrl');
					return deferred.promise;
				}]
			}
		})
}