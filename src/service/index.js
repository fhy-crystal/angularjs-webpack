import common from './common';
import httpRequest from './httpRequest';
import toast from './toast';
import loading from './loading';

export default angular.module('commonService', [])
	.service('httpRequestSrv', httpRequest)
	.service('commonSrv', common)
	.service('toastSrv', toast)
	.service('loadingSrv', loading)
	.name;