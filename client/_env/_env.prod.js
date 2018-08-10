window.__env = {
    id: 'prod',
    apiBaseUrl: '#{Morpheus.AdminUI__ApiBaseUrl}',
    appInsightsKey: '#{Morpheus.AdminUI__kwpInstrumentationKey}',
    auth: {
        instance: 'https://login.microsoftonline.com/',
        tenant: '#{Morpheus.AdminUI__Tenant}',
        clientId: '#{Morpheus.AdminUI__ClientId}',
        backedId: '#{Morpheus.AdminUI__BackendId}',
        extraQueryParameter: 'nux=1',
        cacheLocation: 'localStorage',
        loggingLevel: 3 // VERBOSE
    }
};