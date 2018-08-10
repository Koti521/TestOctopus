import angular from 'angular';
import uiRouter from 'angular-ui-router';
import shopLookupService from './shop-lookup.service';
import bulkLoadShopLookupComponent from './bulk-shop-lookup-updater.component';
import shopLookupResource from './shop-lookup.resource';

let bulkLoadShopLookupModule = angular.module('bulk-shop-lookup-updater', [
    uiRouter
])
    .component('bulkShopLookupUpdater', bulkLoadShopLookupComponent)
    .service('shopLookupService', shopLookupService)
    .factory('shopLookupResource', shopLookupResource)

.config(($stateProvider) => {
    'ngInject';

    $stateProvider
        .state('bulk-shop-lookup-updater', {
            url: '/bulk-shop-lookup-updater',
            template: `<bulk-shop-lookup-updater></bulk-shop-lookup-updater>`
        });
});

export default bulkLoadShopLookupModule.name;