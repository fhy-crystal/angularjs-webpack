// import './carousel.less'
ctrl.$inject = ['$scope', '$timeout', 'loadingSrv'];
export default function ctrl($scope, $timeout, loadingSrv) {
	loadingSrv.show();
	$timeout(function() {
		loadingSrv.hide();
	}, 10000)
}