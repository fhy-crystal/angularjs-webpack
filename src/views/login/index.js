import loginHtml from './login.html';
import loginCtrl from './login.controller';
import './login.less';


export default angular.module('login', [])
	.component('login', {
		template: loginHtml,
		controller: loginCtrl
	})
	.name;