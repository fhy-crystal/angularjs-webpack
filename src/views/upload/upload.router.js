import uploadHtml from './upload.html';
import uploadCtrl from './upload.ctrl';

router.$inject = ['$stateProvider']

export default function router($stateProvider) {
	$stateProvider
		.state('upload', {
			url: '/upload',
			views: {
				mainContent: {
					template: uploadHtml,
					controller: uploadCtrl
				}
			}
		})
}