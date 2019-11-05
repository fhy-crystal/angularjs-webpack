import slideFollowHtml from './slideFollow.html';
import slideFollowCtrl from './slideFollow.ctrl';

router.$inject = ['$stateProvider']

export default function router($stateProvider) {
	$stateProvider
		.state('slideFollow', {
			url: '/slideFollow',
			views: {
				mainContent: {
					template: slideFollowHtml,
					controller: slideFollowCtrl
				}
			}
		})
}