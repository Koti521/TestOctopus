import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bulkLoadIncentivesComponent from './bulk-load-incentives.component';

let bulkLoadIncentivesModule = angular.module('bulk-load-incentives', [
    uiRouter
])
    .component('bulkLoadIncentives', bulkLoadIncentivesComponent)

    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('bulk-load-incentives', {
                url: '/bulk-load-incentives',
                template: `<bulk-load-incentives></bulk-load-incentives>`
            });
    });

export default bulkLoadIncentivesModule.name;