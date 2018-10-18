import carouselHtml from './carousel.html';
import carouselCtrl from './carousel.ctrl';

router.$inject = ['$stateProvider']

export default function router($stateProvider) {
	$stateProvider
		.state('carousel', {
			url: '/carousel',
			views: {
				mainContent: {
					template: carouselHtml,
					controller: carouselCtrl
				}
			}
		})
}