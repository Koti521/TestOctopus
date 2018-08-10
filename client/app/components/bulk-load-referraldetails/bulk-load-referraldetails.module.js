import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bulkLoadReferralDetailsComponent from './bulk-load-referraldetails.component';

let bulkLoadReferralDetailsModule = angular.module('bulk-load-referraldetails', [
    uiRouter
])
    .component('bulkLoadReferraldetails', bulkLoadReferralDetailsComponent)

    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('bulk-load-referraldetails', {
                url: '/bulk-load-referraldetails',
                template: `<bulk-load-referraldetails></bulk-load-referraldetails>`
            });
    });

export default bulkLoadReferralDetailsModule.name;