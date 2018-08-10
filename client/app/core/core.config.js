export default function (
    $urlRouterProvider, $locationProvider, $httpProvider, blockUIConfig, applicationInsightsServiceProvider, envConfig) {
    'ngInject';

    // @see: http://angular-block-ui.nullest.com/
    blockUIConfig.delay = 0;

    $urlRouterProvider.otherwise('/survey-list');

    $locationProvider.html5Mode(false).hashPrefix('');
    
    applicationInsightsServiceProvider.configure(envConfig.appInsightsKey, {appName:'app'});
}