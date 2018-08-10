import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bulkLoadExclusionComponent from './bulk-load-exclusion.component';

let bulkLoadExclusionModule = angular.module('bulk-load-exclusion', [
    uiRouter
])
    .component('bulkLoadExclusion', bulkLoadExclusionComponent)

    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('bulk-load-exclusion', {
                url: '/bulk-load-exclusion',
                template: `<bulk-load-exclusion></bulk-load-exclusion>`
            });
    });

export default bulkLoadExclusionModule.name;