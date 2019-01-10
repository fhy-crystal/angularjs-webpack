// import './carousel.less'
ctrl.$inject = ['$scope', 'toastSrv'];
export default function ctrl($scope, toastSrv) {
	$scope.slides = [{
		imageUrl: 'https://picsum.photos/750/300'
	}, {
		imageUrl: 'https://picsum.photos/750/301'
	}, {
		imageUrl: 'https://picsum.photos/750/302'
	}];
	$scope.activityIdx = 0;
}