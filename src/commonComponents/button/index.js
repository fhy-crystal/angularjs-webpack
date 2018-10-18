import './button.less'

export default angular.module('wButton', [])
	.component('wButton', {
		template: `<button type="button" class="wBtn {{$ctrl.size}} {{$ctrl.type}}" ng-class="{'wBtn_disabled': $ctrl.disabled}">
						<span ng-if="showText">{{$ctrl.text}}</span>
						<span ng-if="showDText">{{$ctrl.dtext}}</span>
					</button>`,
		controller: ['$scope', function($scope) {
			var $ctrl = this;
			$ctrl.$onInit = () => {
				$ctrl.disabled = $ctrl.disabled ? $ctrl.disabled : false;
				$scope.showText = $ctrl.text && $ctrl.text.length > 0; // static text
				$scope.showDText = $ctrl.dtext && $ctrl.dtext.length > 0; // dynamic text
			}
		}],
		bindings: {
			size: '@',
			type: '@',
			text: '@',
			dtext: '<',
			disabled: '<'
		}
	})
	.name