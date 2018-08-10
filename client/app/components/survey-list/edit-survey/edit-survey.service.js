class EditSurveySerice {
    constructor(surveysResource, $log, eventTraceService) {
        'ngInject';

        this._surveysResource = surveysResource;
        this._$log = $log;
        this._eventTraceService = eventTraceService;
    }

    get(surveyId) {
        if (surveyId === undefined) {
            throw new Error('Survey ID is not defined');
        }

        let promise = this._surveysResource.get({ surveyId }).$promise;
        promise.catch(response => this._$log.error('Error was occured while getting survey', response));
        return promise;
    }

    update(survey) {
        if (survey === undefined) {
            throw new Error('Survey is not defined');
        }

        let surveyModel = angular.toJson(survey);

        let promise = this._surveysResource.update({ surveyId: survey.id }, survey).$promise;
        
        promise.then(response => 
            this._eventTraceService.trace('Edit survey', surveyModel, response.data, response.statusCode, response.url));

        promise.catch((response) => {
            this._$log.error('Error was occured while updating survey', response)
            this._eventTraceService.trace('Edit survey', surveyModel, response.data.data, response.data.statusCode, response.data.url)
        });

        return promise;
    }
}

export default EditSurveySerice;