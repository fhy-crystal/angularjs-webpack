import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';


import views from '_views';
import commonComponents from '_commonComponents';
import commonService from '_service';

import appEnv from '_config/env'
import appRouter from '_config/router';

import './assets/style/common.css'


angular.module('webapp', [uiRouter, uiBootstrap, views, commonComponents, commonService])
	.config(appRouter)
	.constant('ENV', appEnv)
