import EditSurveyService from './edit-survey.service';

describe('Edit Survey Service', () => {
    let service;
    let surveysResource, $log;

    beforeEach(() => {
        surveysResource = { get: sinon.stub(), update: sinon.stub() };
        $log = { error: sinon.stub() };
        service = new EditSurveyService(surveysResource, $log);
    });

    afterEach(() => {
        service = surveysResource = $log = null;
    });

    it('should be defined', () => {
        expect(service).to.be.defined;
    });

    describe('get', () => {
        it('should throw Error if input survey id is undefined', () => {
            expect(() => { service.get(undefined); }).to.throw(Error);
        });

        it('should call get resource with appropriate survey id', () => {
            let surveyId = '00000000-0000-0000-0000-000000000000';
            surveysResource.get.returns({ $promise: Promise.resolve() });
            service.get(surveyId);
            expect(surveysResource.get).to.have.been.calledOnce.and
                .calledWith({ surveyId });
        });

        it('should log error in case of failure', (done) => {
            surveysResource.get.returns({ $promise: Promise.reject() });
            service.get('some id').catch(() => {
                expect($log.error).to.have.been.calledOnce;
                done();
            });
        });
    });

    describe('update', () => {
        it('should throw Error if input survey is undefined', () => {
            expect(() => { service.update(undefined); }).to.throw(Error);
        });

        it('should call update resource with appropriate survey id', () => {
            let surveyToSave = { id: '00000000-0000-0000-0000-000000000000', allowNotification: true };
            surveysResource.update.returns({ $promise: Promise.resolve() });
            service.update(surveyToSave);
            expect(surveysResource.update).to.have.been.calledOnce.and
                .calledWith({ surveyId: '00000000-0000-0000-0000-000000000000' }, sinon.match.any);
        });

        it('should call update resource with appropriate survey entity', () => {
            let surveyToSave = { allowNotification: true };
            surveysResource.update.returns({ $promise: Promise.resolve() });
            service.update(surveyToSave);
            expect(surveysResource.update).to.have.been.calledOnce.and.calledWith(sinon.match.any, surveyToSave);
        });

        it('should log error in case of failure', (done) => {
            surveysResource.update.returns({ $promise: Promise.reject() });
            service.update({ }).catch(() => {
                expect($log.error).to.have.been.calledOnce;
                done();
            });
        });

        it('should return promise in any case', (done) => {
            surveysResource.update.returns({ $promise: Promise.resolve() });
            service.update({ }).then(() => {
                done();
            }).catch(() => { 
                throw new Error('Reject promise was returned'); 
            });
        });
    });
});