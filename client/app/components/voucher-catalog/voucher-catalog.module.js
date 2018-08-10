import angular from 'angular';
import voucherCatalogListModule from './voucher-catalog-list/voucher-catalog-list.module';
import voucherCatalogComponent from './voucher-catalog.component';

let voucherCatalogModule = angular.module('voucher-catalog', [
    voucherCatalogListModule
])
    .component('voucherCatalog', voucherCatalogComponent)    
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('voucher-catalog', {
                url: '/voucher-catalog',
                template: `<voucher-catalog></voucher-catalog>`
            });
    });

export default voucherCatalogModule.name;