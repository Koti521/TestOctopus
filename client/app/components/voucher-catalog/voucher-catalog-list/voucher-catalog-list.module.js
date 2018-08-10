import angular from 'angular';
import voucherCatalogListComponent from './voucher-catalog-list.component';
import voucherCatalogListService from './voucher-catalog-list.service';
import addVoucherModule from './add-voucher/add-voucher.module';

let voucherCatalogListModule = angular.module('voucher-catalog-list', [
    addVoucherModule
])
    .component('voucherCatalogList', voucherCatalogListComponent)
    .service('voucherCatalogListService', voucherCatalogListService);

export default voucherCatalogListModule.name;