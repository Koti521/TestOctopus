import AddSurveyService from './add-survey.service';

describe('Add Survey Service', () => {
    let service;
    let surveysResource, questbackSurveyResource, $log;

    beforeEach(() => {
        questbackSurveyResource = { get: sinon.stub() };
        surveysResource = { save: sinon.stub() };
        $log = { error: sinon.stub() };
        service = new AddSurveyService(surveysResource, questbackSurveyResource, $log);
    });

    afterEach(() => {
        service = questbackSurveyResource = surveysResource = $log = null;
    });

    it('should be defined', () => {
        expect(service).to.be.defined;
    });

    describe('validateQuestbackId', () => {
        it('should throw Error if input questbackId is undefined', () => {
            expect(() => { service.validateQuestbackId(undefined); }).to.throw(Error);
        });

        it('should call questback resource with right id', () => {
            questbackSurveyResource.get.returns({ $promise: Promise.resolve() });
            service.validateQuestbackId(12345678);
            expect(questbackSurveyResource.get).to.have.been.calledOnce.and.calledWith({ id: 12345678 });
        });

        it('should return promise in any case', (done) => {
            questbackSurveyResource.get.returns({ $promise: Promise.resolve() });
            service.validateQuestbackId(12345).then(() => {
                done();
            }).catch(() => { 
                throw new Error('Reject promise was returned'); 
            });
        });
    });

    describe('save', () => {
        it('should throw Error if input survey is undefined', () => {
            expect(() => { service.save(undefined); }).to.throw(Error);
        });

        it('should call addSurvey resource with appropriate survey', () => {
            let surveyToSave = { questbackId: 12345678 };
            surveysResource.save.returns({ $promise: Promise.resolve() });
            service.save(surveyToSave);
            expect(surveysResource.save).to.have.been.calledOnce.and.calledWith(surveyToSave);
        });

        it('should log error in case of failure', (done) => {
            surveysResource.save.returns({ $promise: Promise.reject() });
            service.save({ }).catch(() => {
                expect($log.error).to.have.been.calledOnce;
                done();
            });
        });

        it('should return promise in any case', (done) => {
            surveysResource.save.returns({ $promise: Promise.resolve() });
            service.save({ }).then(() => {
                done();
            }).catch(() => { 
                throw new Error('Reject promise was returned'); 
            });
        });
    });
});