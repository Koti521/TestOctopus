import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bulkLoadExpirydatesComponent from './bulk-load-expirydates.component';

let bulkLoadExpirydatesModule = angular.module('bulk-load-expirydates', [
    uiRouter
])
    .component('bulkLoadExpirydates', bulkLoadExpirydatesComponent)

    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('bulk-load-expirydates', {
                url: '/bulk-load-expirydates',
                template: `<bulk-load-expirydates></bulk-load-expirydates>`
            });
    });

export default bulkLoadExpirydatesModule.name;