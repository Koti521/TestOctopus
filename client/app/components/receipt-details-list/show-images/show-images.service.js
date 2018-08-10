class ShowImagesService {
    constructor(showImagesResource, $log) {
        'ngInject';

        this._showImagesResource = showImagesResource;
        this._$log = $log;
    }

    getImages(receiptId) {
        if (!receiptId) {
            throw new Error('ReceiptId cannot be undefined');
        }

        let promise = this._showImagesResource.get({ receiptId }).$promise
            .then(data => JSON.parse(data.data))
            .catch(response => this._$log.error('Error was occured while getting images for receipt', response));

        return promise;
    }
}

export default ShowImagesService;