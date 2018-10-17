import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';


import views from '_views';
import commonComponents from '_commonComponents';

import appEnv from './config/env'
import appRouter from './config/router';
import httpRequest from './config/httpRequest';

import './assets/css/bootstrap.css'

angular.module('webapp', [uiRouter, uiBootstrap, views, commonComponents])
	.config(appRouter)
	.constant('ENV', appEnv)
	.service('httpRequest', httpRequest)
