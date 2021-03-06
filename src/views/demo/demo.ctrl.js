import './demo.less'
ctrl.$inject = ['$scope', 'toastSrv', 'httpRequestSrv'];
export default function ctrl($scope, toastSrv, httpRequestSrv) {
	$scope.title = 'test test';

	$scope.toast = () => {
		toastSrv('test')
	}

	$scope.sendRequest = () => {
		httpRequestSrv.get({
			url: '/api/v1/wd/products/353473807EF845649ACCF49DAA1DB777/alltype/two'
		})
		.then(res => {
			console.log(res);
		}, err => {
			console.log(err);
		})
	}
	// webpack 4.0
	// $scope.sendRequest = async () => {
	// 	try {
	// 		let res = await httpRequestSrv.get({
	// 			url: '/api/v1/wd/products/353473807EF845649ACCF49DAA1DB777/alltype/two'
	// 		})
	// 		console.log(res);
	// 	} catch (e) {
	// 		console.log(e)
	// 	}
		
	// }
}