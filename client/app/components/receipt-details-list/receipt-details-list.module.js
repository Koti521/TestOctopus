import angular from 'angular';

import showImagesModule from './show-images/show-images.module';

import receiptDetailsListComponent from './receipt-details-list.component';
import receiptDetailsListService from './receipt-details-list.service';
import receiptDetailsListResource from './receipt-details-list.resource';
import receiptGridOptions from './receipt-details-list.const';

let receiptDetailsListModule = angular.module('receipt-details-list', [
    showImagesModule
])
    .component('receiptDetailsList', receiptDetailsListComponent)
    .service('receiptDetailsListService', receiptDetailsListService)
    .factory('receiptDetailsListResource', receiptDetailsListResource)
    .constant('receiptGridOptions', receiptGridOptions)

    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('receipt-details-list', {
                url: '/receipt-details-list',
                template: `<receipt-details-list></receipt-details-list>`
            });
    });

export default receiptDetailsListModule.name;