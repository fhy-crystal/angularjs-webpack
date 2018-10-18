import './icon.less';

export default angular.module('wIcon', [])
	.component('wIcon', {
		template: `<span class="wIcon {{$ctrl.type}}"></span>`,
		bindings: {
			type: '@'
		}
	})
	.name