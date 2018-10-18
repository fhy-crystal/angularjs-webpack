import demoHtml from './demo.html';
import demoCtrl from './demo.ctrl';

router.$inject = ['$stateProvider']

export default function router($stateProvider) {
	$stateProvider
		.state('demo', {
			url: '/demo',
			views: {
				mainContent: {
					template: demoHtml,
					controller: demoCtrl
				}
			}
		})
}