class EditSurveyController {
    constructor(editSurveyService, appConfig, $filter) {
        'ngInject';

        this._editSurveyService = editSurveyService;
        this._$filter = $filter;
        this._appConfig = appConfig;
    }

    $onInit() {
        this.minExpiryDate = new Date().toISOString();
        this.dateTimeFormat = this._appConfig.dateTimeFormat;

        return this._editSurveyService.get(this.surveyId).then((survey) => {
            this.survey = survey;
            this.survey.surveyExpiryDateTime = this._$filter('date')(this.survey.surveyExpiryDateTime, this.dateTimeFormat);
        });
    }

    save() {
        let promise = this._editSurveyService.update(this.survey).then(() => {
            if (this.onSaved) {
                return this.onSaved(this.survey);
            }
        });

        return promise;
    }

    cancel() {
        if (this.onCanceled) {
            this.onCanceled();
        }
    }
}

export default EditSurveyController;