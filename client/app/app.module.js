import angular from 'angular';

import coreModule from './core/core.module';
import sharedModule from './shared/shared.module';
import componentsModule from './components/components.module';

import appComponent from './app.component';

angular.module('app', [
    coreModule,
    sharedModule,
    componentsModule
])

.component('app', appComponent);