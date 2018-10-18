import './demo.less'
ctrl.$inject = ['$scope', 'toastSrv'];
export default function ctrl($scope, toastSrv) {
	$scope.title = 'test test';

	$scope.toast = () => {
		toastSrv('test')
	}
}