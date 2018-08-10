import MissingTranscriptionsGridController from './missing-transcriptions-grid.controller';
import MissingTranscriptionsGridService from './missing-transcriptions-grid.service';
import ModalWindowService from '../../../shared/components/modal-window/modal-window.service';
import QueryStringService from '../../../shared/services/queryString.service';

describe('Missing Transcriptions Grid Controller', () => {
    let controller, service, modalWindowService, appConfig, queryStringService, options;
    let queryStringObj; 

    beforeEach(() => {
        service = sinon.createStubInstance(MissingTranscriptionsGridService);
        modalWindowService = sinon.createStubInstance(ModalWindowService);
        appConfig = { dateTimeFormat: sinon.stub() };
        queryStringService = sinon.createStubInstance(QueryStringService);
        options = {};
        queryStringObj = {};
        queryStringService.getQuery.returns(queryStringObj);;
        controller = new MissingTranscriptionsGridController(service, options, appConfig, () => sinon.stub(), queryStringService, modalWindowService);
    });

    afterEach(() => {
        controller = service = modalWindowService = queryStringService = appConfig = options = null;
    });

    it('should be defined', () => {
        expect(controller).to.be.defined;
    });

    describe('$onInit', () => {
        beforeEach(() => {
            service.getList.returns(Promise.resolve(sinon.stub()));
        });

        it('should set dateTimeFormat with value from appConfig', () => {
            appConfig.dateTimeFormat = 'yyyy/MM/dd';
            controller.$onInit();
            expect(controller.dateTimeFormat).to.equal('yyyy/MM/dd');
        });

        it('should make filter defined always', () => {
            controller.$onInit();
            expect(controller.filter).to.be.defined;
        });

        it('should make gridOptions defined always', () => {
            controller.$onInit();
            expect(controller.gridOptions).to.be.defined;
        });

        it('should call refresh transcriptions', () => {
            controller.$onInit();
            expect(service.getList).to.have.been.calledOnce.and.calledWith(controller.filter);
        });

        describe('Filter', () => {
            it('should set page number by default from options', () => {
                options.defaultPageNumber = 42;
                controller.$onInit();
                expect(controller.filter.pageNumber).to.equal(42);
            });

            it('should set page number from query string if it is provided', () => {
                queryStringObj.pageNumber = 2;
                options.defaultPageNumber = 1;
                controller.$onInit();
                expect(controller.filter.pageNumber).to.equal(2);
            });
            
            it('should ignore page number from query string if it is not a number', () => {
                queryStringObj.pageNumber = 'bla';
                options.defaultPageNumber = 1;
                controller.$onInit();
                expect(controller.filter.pageNumber).to.equal(1);
            });

            it('should ignore page number from query string if it is lower 1', () => {
                queryStringObj.pageNumber = -25;
                options.defaultPageNumber = 1;
                controller.$onInit();
                expect(controller.filter.pageNumber).to.equal(1);
            });

            it('should set page size by default from options', () => {
                options.defaultPageSize = 42;
                controller.$onInit();
                expect(controller.filter.pageSize).to.equal(42);
            });

            it('should set page size from query string if it is provided', () => {
                queryStringObj.pageSize = 25;
                options.availablePageSizes = [25, 50];
                options.defaultPageSize = 50;
                controller.$onInit();
                expect(controller.filter.pageSize).to.equal(25);
            });
            
            it('should ignore page size from query string if it is not a number', () => {
                queryStringObj.pageSize = 'bla';
                options.availablePageSizes = [25, 50];
                options.defaultPageSize = 50;
                controller.$onInit();
                expect(controller.filter.pageSize).to.equal(50);
            });

            it('should ignore page size from query string if it is not included into available values', () => {
                queryStringObj.pageSize = 1;
                options.availablePageSizes = [25, 50];
                options.defaultPageSize = 50;
                controller.$onInit();
                expect(controller.filter.pageSize).to.equal(50);
            });
        });
    });
});