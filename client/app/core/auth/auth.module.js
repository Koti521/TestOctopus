import angular from 'angular';
import adalDecorator from './adal.decorator.js';

import authConfig from './auth.config';
import authRun from './auth.run';

let authModule = angular.module('app.core.auth', [adalDecorator])
    .config(authConfig)
    .run(authRun);

export default authModule.name;