import BigPrizeWinnerListService from './big-prize-winner-list.service';

describe('Big Prize Winner List Service', () => {
    let service;
    let $q, $scope, $log;
    let bigPrizeWinnerResource;

    beforeEach(inject((_$rootScope_, _$q_, _$log_) => {
        $scope = _$rootScope_.$new();
        $q = _$q_;
        bigPrizeWinnerResource = { getWinnerData: sinon.stub() };
        $log = sinon.stub(_$log_);

        service = new BigPrizeWinnerListService(bigPrizeWinnerResource, $log);
    }));

    afterEach(() => {
        bigPrizeWinnerResource = $log = null;
    });

    it('should be defined', () => {
        expect(service).to.be.defined;
    });

    it('should log error in case of resource promise rejection', () => {
        bigPrizeWinnerResource.getWinnerData.returns({ $promise: $q.reject() });
        
        var p = service.getWinnerData();
        $scope.$apply();

        expect($log.error).to.have.been.calledOnce;
    });

    it('should return promise with appropriate winner data', () => {
        let winnersData = { issuedFrom: '11/10/2016', iisuedTo: '20/10/2016', winners: [] };
        bigPrizeWinnerResource.getWinnerData.returns({ $promise: $q.resolve(winnersData) });

        let receivedWinnersData = {};
        service.getWinnerData().then((data) => { receivedWinnersData = data });
        $scope.$apply();

        expect(winnersData).to.equal(receivedWinnersData);
    });
});