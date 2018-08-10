import angular from 'angular';
import appConfig from './appConfig.const';
import envConfig from './envConfig.const';

let configurationModule = angular.module('app.core.configuration', [])
    .constant('appConfig', appConfig)
    .constant('envConfig', envConfig);

export default configurationModule.name;