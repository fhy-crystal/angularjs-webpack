import modalHtml from './modal.html';
import modalCtrl from './modal.ctrl';

router.$inject = ['$stateProvider']

export default function router($stateProvider) {
	$stateProvider
		.state('modal', {
			url: '/modal',
			views: {
				mainContent: {
					template: modalHtml,
					controller: modalCtrl
				}
			}
		})
}