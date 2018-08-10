import SurveyListController from './survey-list.controller';
import SurveyListService from './survey-list.service';
import ModalWindowService from '../../shared/components/modal-window/modal-window.service';
import QueryStringService from '../../shared/services/queryString.service';

describe('Survey List Controller', () => {
    let controller, surveyListService, modalWindowService, queryStringService, surveyStatus, gridOptions;

    beforeEach(() => {
        surveyListService = sinon.createStubInstance(SurveyListService);
        modalWindowService = sinon.createStubInstance(ModalWindowService);
        queryStringService = sinon.createStubInstance(QueryStringService);
        surveyStatus = {};
        gridOptions = {};
        controller = new SurveyListController(surveyListService, modalWindowService, queryStringService, surveyStatus);
    });

    afterEach(() => {
        controller = surveyListService = modalWindowService = queryStringService = surveyStatus = null;
    });

    it('should be defined', () => {
        expect(controller).to.be.defined;
    });

    describe('deactivateSurvey', () => {
        it('should call survey deactivate once if user comfirms', (done) => {
            controller.selectedSurvey = { id: 1 };
            controller.refreshSurveys = sinon.stub();
            modalWindowService.open.returns(Promise.resolve());

            controller.deactivateSurvey().then(() => {
                expect(surveyListService.deactivateSurvey).to.have.been.calledOnce;
                done();
            });
        });

        it('should refresh survey list once if user comfirms', (done) => {
            controller.selectedSurvey = { id: 1 };
            controller.refreshSurveys = sinon.stub();
            modalWindowService.open.returns(Promise.resolve());
            surveyListService.deactivateSurvey.returns(Promise.resolve());

            controller.deactivateSurvey().then(() => {
                expect(controller.refreshSurveys).to.have.been.calledOnce;
                done();
            });
        });
    });
 });