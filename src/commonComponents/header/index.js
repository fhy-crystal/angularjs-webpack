import './header.less';

export default angular.module('wHeader', [])
	.component('wHeader', {
		template: `<div class="wHeader">
						<w-icon class="backBtn" type="wIcon_back" ng-click="back()" ng-hide="hideBack"></w-icon>
						{{$ctrl.title}}
					</div>`,
		controller: ['$scope', function($scope) {
			var $ctrl = this;
			$ctrl.$onInit = () => {
				$scope.hideBack = $ctrl.hideBack ? $ctrl.hideBack : false;
			};
			$scope.back = () => {
				history.go(-1);
			};
		}],
		bindings: {
			title: '@',
			hideBack: '@'
		}
	})
	.name