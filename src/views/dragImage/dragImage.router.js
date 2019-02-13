import dragImageHtml from './dragImage.html';
import dragImageCtrl from './dragImage.ctrl';

router.$inject = ['$stateProvider']

export default function router($stateProvider) {
	$stateProvider
		.state('dragImage', {
			url: '/dragImage',
			views: {
				mainContent: {
					template: dragImageHtml,
					controller: dragImageCtrl
				}
			}
		})
}