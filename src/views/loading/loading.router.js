import loadingHtml from './loading.html';
import loadingCtrl from './loading.ctrl';

router.$inject = ['$stateProvider']

export default function router($stateProvider) {
	$stateProvider
		.state('loading', {
			url: '/loading',
			views: {
				mainContent: {
					template: loadingHtml,
					controller: loadingCtrl
				}
			}
		})
}