import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/flatly/bootstrap.css';
import 'angular-block-ui/dist/angular-block-ui.css';
import 'angularjs-datetime-picker-v2/angularjs-datetime-picker.css';
import './../app.less';

import angular from 'angular';
import ngTouch from 'angular-touch';
import blockUI from 'angular-block-ui/dist/angular-block-ui';
import 'angularjs-datetime-picker-v2/angularjs-datetime-picker';
import uiRouter from 'angular-ui-router';
import resource from 'angular-resource';
import ngMessages from 'angular-messages';
import ngDropdown from 'angular-ui-bootstrap/src/dropdown';
import ngCollapse from 'angular-ui-bootstrap/src/collapse';
import 'angular-applicationinsights';

import coreConfigFunction from './core.config';
import configurationModule from './configuration/configuration.module';
import authModule from './auth/auth.module';
import ngFileSaver from 'angular-file-saver/dist/angular-file-saver.bundle'

let
coreModule = angular.module('app.core', [
    ngTouch,
    'angularjs-datetime-picker',
    uiRouter,
    blockUI,
    resource,
    ngMessages,
    'AdalAngular',
    configurationModule,
    authModule,
    ngFileSaver,
    ngDropdown,
    ngCollapse,
    'ApplicationInsightsModule'
])
.config(coreConfigFunction);

export default coreModule.name;