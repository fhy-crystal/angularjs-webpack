import swiperHtml from './swiper.html';
import swiperCtrl from './swiper.ctrl';

router.$inject = ['$stateProvider']

export default function router($stateProvider) {
	$stateProvider
		.state('swiper', {
			url: '/swiper',
			views: {
				mainContent: {
					template: swiperHtml,
					controller: swiperCtrl
				}
			}
		})
}