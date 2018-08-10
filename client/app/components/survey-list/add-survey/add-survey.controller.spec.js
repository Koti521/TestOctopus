import AddSurveyController from './add-survey.controller';
import AddSurveyService from './add-survey.service';
import ModalWindowService from '../../../shared/components/modal-window/modal-window.service';

describe('Add Survey Controller', () => {
    let controller, addSurveyService, modalWindowService, appConfig;

    beforeEach(() => {
        addSurveyService = sinon.createStubInstance(AddSurveyService);
        modalWindowService = sinon.createStubInstance(ModalWindowService);
        appConfig = { dateTimeFormat: sinon.stub() };
        controller = new AddSurveyController(addSurveyService, modalWindowService, appConfig);
    });

    afterEach(() => {
        controller = addSurveyService = appConfig = null;
    });

    it('should be defined', () => {
        expect(controller).to.be.defined;
    });

    describe('$onInit', () => {
        it('should define survey', () => {
            controller.$onInit();
            expect(controller.survey).to.be.defined;
        });

        it('should set surveyInAppName with empty string by default', () => {
            controller.$onInit();
            expect(controller.survey.surveyInAppName).to.equal('');
        });

        it('should set surveyInternalName with empty string by default', () => {
            controller.$onInit();
            expect(controller.survey.surveyInternalName).to.equal('');
        });

        it('should set token with empty string by default', () => {
            controller.$onInit();
            expect(controller.survey.token).to.equal('');
        });

        it('should set surveyExpiryDateTime with empty value by default', () => {
            controller.$onInit();
            expect(controller.survey.surveyExpiryDateTime).to.equal('');
        });

        it('should set surveyTime with empty value by default', () => {
            controller.$onInit();
            expect(controller.survey.surveyTime).to.equal('');
        });

        it('should set allowNotification with true value by default', () => {
            controller.$onInit();
            expect(controller.survey.allowNotification).to.equal(true);
        });

        it('should set questbackSurveyId with empty string by default', () => {
            controller.$onInit();
            expect(controller.survey.questbackSurveyId).to.equal('');
        });

        it('should set questbackValidated with false value by default', () => {
            controller.$onInit();
            expect(controller.questbackValidated).to.equal(false);
        });

        it('should set questbackValidationMessage with empty value by default', () => {
            controller.$onInit();
            expect(controller.questbackValidationMessage).to.equal('');
        });

        it('should set dateTimeFormat with value from appConfig', () => {
            appConfig.dateTimeFormat = 'yyyy/MM/dd';
            controller.$onInit();
            expect(controller.dateTimeFormat).to.equal('yyyy/MM/dd');
        });
    });

    describe('resetSurveyExpiryDate', () => {
        it('should set surveyExpiryDateTime with empty string', () => {
            controller.survey = { surveyExpiryDateTime: '2017/01/24 23:59:00' };
            controller.resetSurveyExpiryDate();
            expect(controller.survey.surveyExpiryDateTime).to.equal('');
        });
    });

    describe('resetquestbackValidationMessage', () => {
        it('should set questbackValidationMessage with empty string', () => {
            controller.questbackValidationMessage = 'Some error';
            controller.resetQuestbackValidationMessage();
            expect(controller.questbackValidationMessage).to.equal('');
        });
    });

    describe('validateQuestbackSurveyId', () => {
        it('should set surveyUrl after success validation result', (done) => {
            let surveyUrl = 'http://questback.com/12345678'
            addSurveyService.validateQuestbackId.returns(Promise.resolve({surveyUrl: surveyUrl }));
            controller.survey = { questbackSurveyId: '' };

            controller.validateQuestbackSurveyId().then(() => {
                expect(controller.survey.surveyUrl).to.equal(surveyUrl);
                done();
            });
        });

        it('should set surveyInternalName after success validation result', (done) => {
            let surveyTitle = 'Internal Survey Name';
            addSurveyService.validateQuestbackId.returns(Promise.resolve({ surveyTitle: surveyTitle }));
            controller.survey = { questbackSurveyId: '' };

            controller.validateQuestbackSurveyId().then(() => {
                expect(controller.survey.surveyInternalName).to.equal(surveyTitle);
                done();
            });
        });

        it('should set questbackValidationMessage with default epmpty value after success validation result', (done) => {
            addSurveyService.validateQuestbackId.returns(Promise.resolve({ isError: false }));
            controller.survey = { questbackSurveyId: '' };

            controller.validateQuestbackSurveyId().then(() => {
                expect(controller.questbackValidationMessage).to.equal('');
                done();
            });
        });

        it('should set questbackValidationMessage with value from response after validation failure', (done) => {
            let errorMessage = 'Some error';
            addSurveyService.validateQuestbackId.returns(Promise.resolve({ isError: true, errorMessage: errorMessage }));
            controller.survey = { questbackSurveyId: '' };

            controller.validateQuestbackSurveyId().then(() => {
                expect(controller.questbackValidationMessage).to.equal(errorMessage);
                done();
            });
        });

        it('should set questbackValidated with true after success validation result', (done) => {
            addSurveyService.validateQuestbackId.returns(Promise.resolve({ isError: false }));
            controller.survey = { questbackSurveyId: '' };

            controller.validateQuestbackSurveyId().then(() => {
                expect(controller.questbackValidated).to.equal(true);
                done();
            });
        });
    });

    describe('save', () => {
        it('should call onSaved in case when onSaved function is defined and addSurveyService saved survey successfully', (done) => {
            let surveyToSave = { questbackSurveyId: 12345678 };
            addSurveyService.save.returns(Promise.resolve());
            controller.onSaved = sinon.spy();
            controller.survey = surveyToSave;

            controller.save().then(() => {
                expect(controller.onSaved).to.have.been.calledOnce.and.calledWith(surveyToSave);
                done();
            });
        });

        it('should display success message in case when survey was added', (done) => {
            addSurveyService.save.returns(Promise.resolve());
            controller.survey =  { questbackSurveyId: 12345678 };

            controller.save().then(() => {
                expect(modalWindowService.openInfoDialog).to.have.been.calledOnce;
                done();
            });
        });
    });

    describe('cancel', () => {
        it('should call onCanceled in case when onCanceled function is defined', () => {
            controller.onCanceled = sinon.spy();
            controller.cancel();
            expect(controller.onCanceled).to.have.been.calledOnce;
        });
    });
});