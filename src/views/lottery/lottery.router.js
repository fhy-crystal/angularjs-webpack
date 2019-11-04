import lotteryHtml from './lottery.html';
import lotteryCtrl from './lottery.ctrl';

router.$inject = ['$stateProvider']

export default function router($stateProvider) {
	$stateProvider
		.state('lottery', {
			url: '/lottery',
			views: {
				mainContent: {
					template: lotteryHtml,
					controller: lotteryCtrl
				}
			}
		})
}