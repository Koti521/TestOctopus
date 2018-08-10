class AddSurveyController {
    constructor(addSurveyService, modalWindowService, appConfig) {
        'ngInject';

        this._addSurveyService = addSurveyService;
        this._modalWindowService = modalWindowService;
        this._appConfig = appConfig;
    }

    $onInit() {
        this.survey = {
            surveyInAppName: '',
            surveyInternalName: '',
            token: '',
            surveyExpiryDateTime: '',
            surveyTime: '',
            allowNotification: true,
            questbackSurveyId: '',
            surveyUrl: null,
            surveyDurationDays: 0,
            surveyDurationHours: 0
        };
        this.questbackValidated = false;
        this.questbackValidationMessage = '';
        this.numericPattern = '\\d+';
        this.dateTimeFormat = this._appConfig.dateTimeFormat;
    }
    
    resetSurveyExpiryDate() {
        this.survey.surveyExpiryDateTime = '';
    }

    resetQuestbackValidationMessage() {
        this.questbackValidationMessage = '';
    }

    validateQuestbackSurveyId() {
        return this._addSurveyService.validateQuestbackId(this.survey.questbackSurveyId).then((validationResult) => {
            this.questbackValidated = !validationResult.isError;
            this.questbackValidationMessage = validationResult.isError === true ? validationResult.errorMessage : '';
            this.survey.surveyUrl = validationResult.surveyUrl;
            this.survey.surveyInternalName = validationResult.surveyTitle;
        }).catch((errorResponse) => {
            if (errorResponse && errorResponse.data) {
                this.questbackValidationMessage = errorResponse.data.description;
            }
        });
    }

    save() {
        return this._addSurveyService.save(this.survey).then(() => {
            if (this.onSaved) {
                this.onSaved(this.survey);
            }
            this._modalWindowService.openInfoDialog('Add survey', 'Survey was added');
        }).catch(() => {
            this._modalWindowService.openInfoDialog('Add survey', 'Survey was not added');
        });
    }

    cancel() {
        if (this.onCanceled) {
            this.onCanceled();
        }
    }
}

export default AddSurveyController;