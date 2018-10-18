import './header.less';

export default angular.module('wHeader', [])
	.component('wHeader', {
		template: `<div class="wHeader">{{$ctrl.title}}</div>`,
		controller: ['$scope', function($scope) {
			var $ctrl = this;
			$ctrl.onInit = () => {
				$scope.hideBack = $ctrl.hideBack ? $ctrl.hideBack : false;
			}
		}],
		bindings: {
			title: '@',
			hideBack: '@'
		}
	})
	.name