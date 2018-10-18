import common from './common';
import httpRequest from './httpRequest';
import toast from './toast';

export default angular.module('commonService', [])
	.service('httpRequestSrv', httpRequest)
	.service('commonSrv', common)
	.service('toastSrv', toast)
	.name;