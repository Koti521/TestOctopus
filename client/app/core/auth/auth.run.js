export default ($rootScope, adalAuthenticationService, eventTraceService) => {
    'ngInject';

    $rootScope.$on('adal:acquireTokenFailure', (error, errorDescription ) => {
        adalAuthenticationService.info('Start handling acquireTokenFailure with calling login explicit', error, errorDescription);
        adalAuthenticationService.login();
    }); 

    $rootScope.$on('adal:loginSuccess', function () {
        eventTraceService.trace('Admin login');
    });

};