loginCtrl.$inject = ['$scope', '$uibModal', 'httpRequestSrv', 'commonSrv'];
export default function loginCtrl($scope, $uibModal, httpRequestSrv, commonSrv) {
	$scope.name = 'Mukuro Rokudo';

	httpRequestSrv.get('test', {a: 1}).then(res => {

	}, error => {

	})

	$scope.items = ['item1', 'item2', 'item3'];
	$scope.open = function() {
		var modalInstance = $uibModal.open({
			template: `<div class="modal-header">
				<h3 class="modal-title">I'm a modal!</h3>
			</div>
			<div class="modal-body">
				<ul>
					<li ng-repeat="item in items">
						<a href="#" ng-click="$event.preventDefault(); selected.item = item">{{ item }}</a>
					</li>
				</ul>
				Selected: <b>{{ selected.item }}</b>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary" type="button" ng-click="ok()">OK</button>
				<button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
			</div>`,
			controller: function($scope, $uibModalInstance, items1) {
				$scope.items = items1;
				   $scope.selected = {
						item: $scope.items[0]
				   };

				   $scope.ok = function () {
						$uibModalInstance.close($scope.selected.item);
				   };

				   $scope.cancel = function () {
				   		$uibModalInstance.close()
					   	// $uibModalInstance.dismiss('cancel');
				   };
			},
			backdrop: "static",
			resolve: {
				items1: function () {
					return $scope.items;
				}
			}
		});

		// modalInstance.result.then(function (selectedItem) {
		//	 $scope.selected = selectedItem;
		// }, function () {
		//	 $log.info('Modal dismissed at: ' + new Date());
		// });
	}
}