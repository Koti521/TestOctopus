import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bulkLoadRemoveComponent from './bulk-load-remove.component';

let bulkLoadRemoveModule = angular.module('bulk-load-remove', [
    uiRouter
])
    .component('bulkLoadRemove', bulkLoadRemoveComponent)

    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('bulk-load-remove', {
                url: '/bulk-load-remove',
                template: `<bulk-load-remove></bulk-load-remove>`
            });
    });

export default bulkLoadRemoveModule.name;