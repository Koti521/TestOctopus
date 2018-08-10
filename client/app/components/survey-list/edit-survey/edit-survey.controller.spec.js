import EditSurveyController from './edit-survey.controller';
import EditSurveyService from './edit-survey.service';

describe('Edit Survey Service', () => {
    let controller, editSurveyService, appConfig, $filter;

    beforeEach(() => {
        editSurveyService = sinon.createStubInstance(EditSurveyService);
        appConfig = { dateTimeFormat: sinon.stub() };
        $filter = () => { return () => {}}; // stub
        controller = new EditSurveyController(editSurveyService, appConfig, $filter);
    });

    afterEach(() => {
        controller = editSurveyService = appConfig = null;
    });

    it('should be defined', () => {
        expect(controller).to.be.defined;
    });

    describe('$onInit', () => {
        it('should set dateTimeFormat with value from appConfig', () => {
            editSurveyService.get.returns(Promise.reject()); 
            appConfig.dateTimeFormat = 'yyyy/MM/dd';
            controller.$onInit();
            expect(controller.dateTimeFormat).to.equal('yyyy/MM/dd');
        });

        it('should call get survey from service with appropriate survey id', () => {
            controller.surveyId = '00000000-0000-0000-0000-000000000001';
            editSurveyService.get.returns(Promise.reject()); 
            controller.$onInit();
            expect(editSurveyService.get).to.have.been.calledOnce
                .and.calledWith(controller.surveyId);
        });

        it('should set survey to viewmodel which is supposed to be returned from service by id', (done) => {
            let survey = { id: '00000000-0000-0000-0000-000000000000', surveyExpiryDateTime: '' };
            editSurveyService.get.returns(Promise.resolve(survey));
            controller.$onInit().then(() => {
                expect(controller.survey).to.equal(survey);
                done();
            });
        });
    });

    describe('save', () => {
        it('should call onSaved in case when onSaved function is defined and editSurveyService updated survey successfully', (done) => {
            let surveyToSave = { questbackSurveyId: 12345678 };
            editSurveyService.update.returns(Promise.resolve());
            controller.onSaved = sinon.spy();
            controller.survey = surveyToSave;

            controller.save().then(() => {
                expect(controller.onSaved).to.have.been.calledOnce.and.calledWith(surveyToSave);
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