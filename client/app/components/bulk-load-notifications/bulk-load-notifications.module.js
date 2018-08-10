import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bulkLoadNotificationsComponent from './bulk-load-notifications.component';

let bulkLoadNotificationsModule = angular.module('bulk-load-notifications', [
    uiRouter
])
    .component('bulkLoadNotifications', bulkLoadNotificationsComponent)

    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('bulk-load-notifications', {
                url: '/bulk-load-notifications',
                template: `<bulk-load-notifications></bulk-load-notifications>`
            });
    });

export default bulkLoadNotificationsModule.name;