class EventTraceService {
    
    constructor(adalAuthenticationService, applicationInsightsService) {
        'ngInject';

        this._adalAuthenticationService = adalAuthenticationService;
        this._applicationInsightsService = applicationInsightsService;
    }

    trace(eventName, httpRequest, httpResponse, statusCode, httpQuery){
        
        let userProfile = this._adalAuthenticationService.userInfo.profile;
        
        var event = {
            adminAction: eventName,
            adminUserName: userProfile.name,
            ip: userProfile.ipaddr,
            timeStamp: new Date().toUTCString(),
            httpRequest: httpRequest===undefined ? {} : httpRequest,
            httpResponse: httpResponse===undefined ? {} : httpResponse,
            httpStatusCode: statusCode,
            httpQuery: httpQuery
        };

        this._applicationInsightsService.trackEvent(eventName, event);
    }
}

export default EventTraceService;