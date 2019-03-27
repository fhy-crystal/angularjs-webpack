import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import ngTouch from 'angular-touch';
import ngInfiniteScroll from 'ng-infinite-scroll';
import ngSortable from 'angular-sortable-view';


import views from '_views';
import commonComponents from '_commonComponents';
import commonService from '_service';
import commonDirective from '_directive';
import commonFilter from '_filter';

import appEnv from '_config/env'
import appRouter from '_config/router';

import './assets/style/common.css'


angular.module('webapp', [
	uiRouter,
	uiBootstrap,
	ngTouch,
	ngInfiniteScroll,
	'angular-sortable-view',
	views,
	commonComponents,
	commonService,
	commonDirective,
	commonFilter
])
.config(appRouter)
.constant('ENV', appEnv)
.run(['$location', 'httpRequestSrv', 'commonSrv', 'toastSrv', function($location, httpRequestSrv, commonSrv, toastSrv) {
	let isWechat = commonSrv.wechatBrowser();
	if (isWechat) {
		let params = {
			url: $location.$$absUrl.split('#')[0]
		};
		// get signature from backend then config
		httpRequestSrv.get('signature', params).then(res => {
			wx.config({
				debug: false,
				appId: res.data.appId,
				timestamp: res.data.timestamp,
				nonceStr: res.data.nonceStr,
				signature: res.data.signature,
				jsApiList: [
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ'
				]
			})
		}, error => {
			toastSrv(error);
		})
	}
}])

