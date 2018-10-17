import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';


import views from '_views';
import commonComponents from '_commonComponents';

import appEnv from '_config/env'
import appRouter from '_config/router';

import httpRequest from '_service/httpRequest';
import commonJs from '_service/common';

import './assets/style/bootstrap.css'

angular.module('webapp', [uiRouter, uiBootstrap, views, commonComponents])
	.config(appRouter)
	.constant('ENV', appEnv)
	.service('httpRequestSrv', httpRequest)
	.service('commonSrv', commonJs)
