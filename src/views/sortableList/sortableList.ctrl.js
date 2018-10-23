import './sortable.less'
ctrl.$inject = ['$scope', 'toastSrv'];
export default function ctrl($scope, toastSrv) {
	$scope.activityList = [];
	let timestamp = (new Date()).getTime();
	for (var i = 0; i < 10; i++) {
		$scope.activityList.push({
			title: `title${i}`,
			onSwipe: false,
			status: '下架',
			timestamp: timestamp
		})
	}

	$scope.swipeLeft = function(idx) {
		$scope.activityList.forEach(item => {
			item.onSwipe = false;
		})
		$scope.activityList[idx].onSwipe = true;
	}

	$scope.swipeRight = function(idx) {
		$scope.activityList[idx].onSwipe = false;
	}

	$scope.sortable = function($item, $partFrom, $partTo, $indexFrom, $indexTo) {
		console.table($item, $partFrom, $partTo, $indexFrom, $indexTo)
	}
}