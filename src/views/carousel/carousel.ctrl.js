// import './carousel.less'
ctrl.$inject = ['$scope', 'toastSrv'];
export default function ctrl($scope, toastSrv) {
	$scope.slides = [{
		imageUrl: 'http://pic.qiantucdn.com/images/banner/5bc5506a3eb0f.jpg'
	}, {
		imageUrl: 'http://pic.qiantucdn.com/images/banner/5bc72417ce7d9.jpg'
	}, {
		imageUrl: 'http://pic.qiantucdn.com/images/banner/5bc69876e0aae.jpg'
	}];
	$scope.activityIdx = 0;
}