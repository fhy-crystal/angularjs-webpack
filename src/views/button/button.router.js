import buttonHtml from './button.html';

router.$inject = ['$stateProvider']

export default function router($stateProvider) {
	$stateProvider
		.state('button', {
			url: '/button',
			views: {
				mainContent: {
					template: buttonHtml
				}
			}
		})
}