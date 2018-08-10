import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bulkErrorLogService from '../../shared/services/bulk-error-log.service';
import bulkErrorLogComponent from './bulk-error-log.component';
import bulkErrorLogResource from '../../shared/resources/bulk-error.resource';

let bulkErrorLogModule = angular.module('bulk-error-log', [
    uiRouter
])
    .component('bulkErrorLog', bulkErrorLogComponent)
    .service('bulkErrorLogService', bulkErrorLogService)
    .factory('bulkErrorLogResource', bulkErrorLogResource)

    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('bulk-incentive-error-log', {
                url: '/bulk-incentive-error-log',
                template: `<bulk-error-log target="incentive" label="Incentives"></bulk-error-log>`
            })
            .state('bulk-notification-error-log', {
                url: '/bulk-notification-error-log',
                template: `<bulk-error-log target="notification" label="Notifications"></bulk-error-log>`
            })
            .state('bulk-invitation-error-log', {
                url: '/bulk-Invitation-error-log',
                template: `<bulk-error-log target="invitation" label="Shoppix Online Invitations"></bulk-error-log>`
            })
            .state('bulk-exclusion-error-log', {
                url: '/bulk-exclusion-error-log',
                template: `<bulk-error-log target="exclusion" label="Shoppix Online Exclusions"></bulk-error-log>`
            })
            .state('bulk-shop-lookup-error-log', {
                url: '/bulk-shop-lookup-error-log',
                template: `<bulk-error-log target="shop-lookup" label="Shop lookup"></bulk-error-log>`
            })
            .state('bulk-referraldetails-error-log', {
                url: '/bulk-referraldetails-error-log',
                template: `<bulk-error-log target="referraldetails" label="Upload Referral"></bulk-error-log>`
            })
            .state('bulk-remove-error-log', {
                url: '/bulk-remove-error-log',
                template: `<bulk-error-log target="removalexclusion" label="Removal of Shoppix Online Exclusion"></bulk-error-log>`
            })
            .state('bulk-expirydates-error-log', {
                url: '/bulk-expirydates-error-log',
                template: `<bulk-error-log target="expirydates" label="Upload Expirydates"></bulk-error-log>`
            });
    });

export default bulkErrorLogModule.name;