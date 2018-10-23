import sortableListHtml from './sortableList.html';
import sortableListCtrl from './sortableList.ctrl';

router.$inject = ['$stateProvider']

export default function router($stateProvider) {
	$stateProvider
		.state('sortableList', {
			url: '/sortableList',
			views: {
				mainContent: {
					template: sortableListHtml,
					controller: sortableListCtrl
				}
			}
		})
}