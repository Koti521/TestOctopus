import angular from 'angular';
import uiRouter from 'angular-ui-router';bulkLoadInvitationsComponent
import bulkLoadInvitationsComponent from './bulk-load-invitations.component';

let bulkLoadInvitationsModule = angular.module('bulk-load-invitations', [
    uiRouter
])
    .component('bulkLoadInvitations', bulkLoadInvitationsComponent)

    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('bulk-load-invitations', {
                url: '/bulk-load-invitations',
                template: `<bulk-load-invitations></bulk-load-invitations>`
            });
    });

export default bulkLoadInvitationsModule.name;