class AddSurveyService {
    constructor(surveysResource, questbackSurveyResource, $log, eventTraceService) {
        'ngInject';

        this._surveysResource = surveysResource;
        this._questbackSurveyResource = questbackSurveyResource;
        this._$log = $log;
        this._eventTraceService = eventTraceService;
    }

    validateQuestbackId(qbId) {
        if (qbId === undefined) {
            throw new Error('Questback id to validate is not defined.');
        }

        return this._questbackSurveyResource.get({ id: qbId }).$promise;
    }

    save(survey) {
        if (survey === undefined) {
            throw new Error('Survey to save is not defined.');
        }

        let promise = this._surveysResource.save(survey).$promise;

        let surveyModel = angular.toJson(survey);

        promise.then(response => this._eventTraceService.trace(
            'Add survey', surveyModel, response.data, response.statusCode, response.url))

        promise.catch((response) => {
            this._$log.error('Error was occured while adding survey', response)
            this._eventTraceService.trace('Add survey', surveyModel, response.data.data, response.data.statusCode, response.data.url)
        });

        return promise;
    }
}

export default AddSurveyService;