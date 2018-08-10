import angular from 'angular';

import navbarModule from './components/navbar/navbar.module';
import footerBarModule from './components/footer-bar/footer-bar.module';
import modalDialogModule from './components/modal-window/modal-window.module';
import fileUploaderModule from './components/file-uploader/file-uploader.module';
import uiGridAdapterModule from './components/ui-grid-adapter/ui-grid-adapter.module';

import bigPrizeWinnerResource from './resources/big-prize-winners.resource';
import voucherCatalogResource from './resources/voucher-catalog.resource';
import surveysResource from './resources/surveys.resource';
import queryStringService from './services/queryString.service';
import bulkErrorLogService from './services/bulk-error-log.service';
import fileService from './services/file.service';
import eventTraceService from './services/event-trace.service';
import yesNoFilter from './filters/yesNo.filter';
import wordifyFilter from './filters/wordify.filter';
import IsTrueDirective from './directives/is-true.directive';
import ReceiptTypeDropdown from './directives/receipt-type-dropdown.directive';
import ReceiptTypeDropdownComponent from './directives/receipt-type-dropdown-component.directive';


let sharedModule = angular.module('app.shared', [
    navbarModule,
    footerBarModule,
    modalDialogModule,
    fileUploaderModule,
    uiGridAdapterModule
])
    .factory('bigPrizeWinnerResource', bigPrizeWinnerResource)
    .factory('surveysResource', surveysResource)
    .factory('voucherCatalogResource', voucherCatalogResource)
    .service('queryStringService', queryStringService)
    .service('bulkErrorLogService', bulkErrorLogService)
    .service('fileService', fileService)
    .service('eventTraceService', eventTraceService)
    .directive('isTrue', () => new IsTrueDirective())
    .directive('receiptTypeDropdown', () => new ReceiptTypeDropdown())
    .directive('receiptTypeDropdownComponent', () => new ReceiptTypeDropdownComponent())
    .filter('yesNo', yesNoFilter)
    .filter('wordify', wordifyFilter);

export default sharedModule.name;