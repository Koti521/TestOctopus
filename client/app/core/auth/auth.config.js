export default function($httpProvider, adalAuthenticationServiceProvider, envConfig) {
    'ngInject';

    let endpoints = {};
    endpoints[envConfig.apiBaseUrl + '/api/admins'] = envConfig.auth.backedId;
    console.log('endpoints : '+endpoints);
    adalAuthenticationServiceProvider.init(
        {
            instance: envConfig.auth.instance,
            tenant: envConfig.auth.tenant,
            clientId: envConfig.auth.clientId,
            extraQueryParameter: envConfig.auth.extraQueryParameter,
            requireADLogin: true,
            endpoints: endpoints,
            anonymousEndpoints: [
                'angular-block-ui/angular-block-ui',
                'ui-grid/ui-grid',
                'ui-grid/uiGridRenderContainer',
                'ui-grid/uiGridColumnMenu',
                'ui-grid/uiGridViewport',
                'ui-grid/uiGridMenu',
                'uib/template/modal/window.html',
                'add-survey-template.html',
                'edit-survey-template.html',
                'add-voucher-template.html',
                'edit-voucher-template.html'
            ],
            cacheLocation: envConfig.auth.cacheLocation
        },
        $httpProvider
    );

    // window.Logging - used in Adal to log all events
    Logging = { // eslint-disable-line
        level: envConfig.auth.loggingLevel,
        log: function (message) {
            // TODO: Investigate using angular logger here!
            console.log(message); // eslint-disable-line
        }
    };
}