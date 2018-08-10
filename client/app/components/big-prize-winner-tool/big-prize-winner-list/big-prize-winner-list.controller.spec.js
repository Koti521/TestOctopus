import BigPrizeWinnerListController from './big-prize-winner-list.controller';
import BigPrizeWinnerListService from './big-prize-winner-list.service';

describe('Big Prize Winner List Controller', () => {
    let controller;
    let $q, $scope, bigPrizeWinnerListService;

    beforeEach(inject((_$rootScope_, _$q_) => {
        $scope = _$rootScope_.$new();
        $q = _$q_;
        bigPrizeWinnerListService = sinon.createStubInstance(BigPrizeWinnerListService);
        controller = new BigPrizeWinnerListController(bigPrizeWinnerListService);
    }));

    afterEach(() => {
        controller = bigPrizeWinnerListService = null;
    });

    it('should be defined', () => {
        expect(controller).to.be.defined;
    });

    it('should set dateFormat property as dd/MM/yyyy', () => {
        expect(controller.dateFormat).to.equal('dd/MM/yyyy');
    });

    describe('$onInit', () => {
        it('should set gridOptions', () => {
            bigPrizeWinnerListService.getWinnerData.returns($q.reject());
            controller.$onInit();
            expect(controller.gridOptions).to.not.be.null;
        });

        it('should fill grid data with big prize winners returned by service', () => {
            let winnersData = { winners: [] };
            bigPrizeWinnerListService.getWinnerData.returns($q.resolve(winnersData));

            controller.$onInit();
            $scope.$apply();

            expect(controller.gridOptions.data).to.equal(winnersData.winners);
        });

        it('should fill issuedFrom property with value returned by service', () => {
            let winnersData = { issuedFrom: '11/10/2016' };
            bigPrizeWinnerListService.getWinnerData.returns($q.resolve(winnersData));

            controller.$onInit();
            $scope.$apply();

            expect(controller.issuedFrom).to.equal(winnersData.issuedFrom);
        });

        it('should fill issuedTo property with value returned by service', () => {
            let winnersData = { issuedTo: '18/10/2016' };
            bigPrizeWinnerListService.getWinnerData.returns($q.resolve(winnersData));

            controller.$onInit();
            $scope.$apply();

            expect(controller.issuedTo).to.equal(winnersData.issuedTo);
        });
    });
});