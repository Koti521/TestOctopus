class BigPrizeWinnerListService {

    constructor(bigPrizeWinnerResource, $log) {
        'ngInject';

        this._bigPrizeWinnerResource = bigPrizeWinnerResource;
        this._$log = $log;
    }

    getWinnerData() {
        let promise = this._bigPrizeWinnerResource.getWinnerData().$promise;

        promise.catch(response => this._$log.error('Error was occured while getting winners data', response));

        return promise;
    }
}

export default BigPrizeWinnerListService;