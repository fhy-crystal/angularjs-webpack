
ctrl.$inject = ['$scope', 'toastSrv'];
function ctrl($scope, toastSrv) {
	$scope.activityList = [];
	$scope.isLoad = false;
	let timestamp = (new Date()).getTime();
	let total = 0;
	$scope.getActivityList = function() {
		for (var i = 0; i < 10; i++) {
			$scope.activityList.push({
				title: `title${i}`,
				onSwipe: false,
				status: '下架',
				timestamp: timestamp
			})
		}
		total ++
		if (total == 3) {
			$scope.isLoad = true;
		}
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
// export default ctrl;
module.exports = angular.module('sortableList').controller('sortableListCtrl', ctrl).name
