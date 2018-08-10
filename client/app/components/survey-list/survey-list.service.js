class SurveyListService {
    constructor(surveyListResource, surveysResource, $log, eventTraceService) {
        'ngInject';

        this._surveyListResource = surveyListResource;
        this._surveysResource = surveysResource;
        this._$log = $log;
        this._totalItemsHeader = 'x-total-survey-count';
        this._eventTraceService = eventTraceService;
    }

    getList(filter) {
        if (filter.pageNumber < 1) {
            throw new Error('Page number cannot be less than 1');
        }

        let totalItems;
        let promise = this._surveysResource.query({
            offset: (filter.pageNumber - 1) * filter.pageSize,
            numberOfItems: filter.pageSize,
            orderBy: filter.sort,
            direction: filter.direction || 'asc',
            surveyInAppName: filter.surveyInAppName,
            surveyInternalName: filter.surveyInternalName
        }, (data, getHeaders) => {
            totalItems = getHeaders(this._totalItemsHeader);
        }).$promise.then(data => {
            return { 
                surveys: data,
                totalItems: totalItems
            };
        });
        promise.catch(response => this._$log.error('Error was occured while getting survey list', response));

        return promise;
    }

    launchSurvey(id) {

        let promise = this._surveyListResource.surveyStatus.launchSurvey({ surveyId: id }).$promise;

        let requestModel = angular.toJson({surveyId: id});

        promise.then(response => {
            this._eventTraceService.trace(
                'Launch survey', requestModel, response.data, response.statusCode, response.url.replace(':surveyId', id))
        });
        promise.catch(response => {
            this._eventTraceService.trace(
                'Launch survey', requestModel, response.data.data, response.data.statusCode, response.data.url.replace(':surveyId', id))
        });

        return promise;
    }

    refreshSurveyUsers(id) {

        let promise = this._surveyListResource.surveyUsers.refresh({ surveyId: id }).$promise;

        let requestModel = angular.toJson({surveyId: id});

        promise.then(response => {
            this._eventTraceService.trace(
                'Refresh survey users', requestModel, response.data, response.statusCode, response.url.replace(':surveyId', id))
        });
        promise.catch(response => {
            this._eventTraceService.trace(
                'Refresh survey users', requestModel, response.data.data, response.data.statusCode, 
                        response.data.url.replace(':surveyId', id))
        });

        return promise;
    }

    deactivateSurvey(id) {

        let promise = this._surveyListResource.status.deactivateSurvey({ surveyId: id }).$promise;

        let requestModel = angular.toJson({surveyId: id});

        promise.then(response => {
            this._eventTraceService.trace(
                'Deactivate survey', requestModel, response.data, response.statusCode, response.url.replace(':surveyId', id))
        }); 
        promise.catch(response => {
            this._eventTraceService.trace(
                'Deactivate survey', requestModel, response.data.data, response.data.statusCode, response.data.url.replace(':surveyId', id))
        });

        return promise;
    }
}

export default SurveyListService;