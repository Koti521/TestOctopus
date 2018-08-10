class VoucherCatalogListService {
    constructor(voucherCatalogResource, eventTraceService, $log, $q) {
        'ngInject';

        this._voucherCatalogResource = voucherCatalogResource;
        this._eventTraceService = eventTraceService;
        this._log = $log;
        this._q = $q;
        this._totalItemsHeader = 'X-Total-VoucherReference-Count';
    }

    addVoucher(voucher) {
        if (voucher === undefined) {
            throw new Error('Voucher to save is not defined.');
        }
        let defer = this._q.defer();
        let voucherModel = angular.toJson(voucher);

        this._voucherCatalogResource.add(voucher)
            .$promise
            .then(response => {
                this._eventTraceService.trace('Add voucher', voucherModel, response.data, response.statusCode, response.url);
                defer.resolve(response);
            }).catch(response => {
                this._log.error('Error occured while adding voucher', response);
                this._eventTraceService.trace('Add voucher',
                    voucherModel, response.data.model, response.data.statusCode, response.data.url);

                let message = 'Error occured while adding voucher. Please try again later.';

                if (response.data.model) {
                    message = angular.fromJson(response.data.model).description;
                }

                defer.reject(message);
            });

        return defer.promise;
    }

    editVoucher(voucher) {
        if (!voucher) {
            throw new Error('Voucher to save is not defined.');
        }

        let defer = this._q.defer();
        let voucherModel = angular.toJson(voucher);

        this._voucherCatalogResource.edit({ voucherReferenceId: voucher.id }, voucher)
            .$promise
            .then(response => {
                this._eventTraceService.trace('Edit voucher', voucherModel, response.data, response.statusCode, response.url);
                defer.resolve(response);
            }).catch(response => {
                this._log.error('Error was occured while editing voucher', response);
                this._eventTraceService.trace('Edit voucher',
                    voucherModel, response.data.model, response.data.statusCode, response.data.url);

                let message = 'Error was occured while editing voucher. Please try again later.';
                if (response.data.model) {
                    message = angular.fromJson(response.data.model).description;
                }

                defer.reject(message);
            });

        return defer.promise;
    }

    deleteVoucher(voucherReferenceId) {
        if (!voucherReferenceId) {
            throw new Error('Voucher Id is not defined.');
        }

        let defer = this._q.defer();
        this._voucherCatalogResource.delete({ voucherReferenceId: voucherReferenceId })
            .$promise
            .then(response => {
                this._eventTraceService.trace('Delete voucher', voucherReferenceId, response.data, response.statusCode, response.url);
                defer.resolve(response);
            }).catch((response) => {
                this._log.error('Error was occured while deleting voucher', response);
                this._eventTraceService.trace('Delete voucher',
                    voucherReferenceId, response.data.model, response.data.statusCode, response.data.url);
                let message;
                if (response.data.model) {
                    message = angular.fromJson(response.data.model).description;
                }
                if (response.status === 409) {
                    message = 'Voucher Reference record cannot be removed where a corresponding Voucher exists in the Voucher Catalog.';
                }
                defer.reject(message);
            });

        return defer.promise;
    }

    getVoucherCatalog(filter) {
        if (filter.pageNumber < 1) {
            throw new Error('Page number cannot be less than 1');
        }

        let totalItems;
        let promise = this._voucherCatalogResource.query({
            offset: (filter.pageNumber - 1) * filter.pageSize,
            numberOfItems: filter.pageSize
        }, (data, getHeaders) => {
            totalItems = getHeaders(this._totalItemsHeader);
        }).$promise.then(data => {
            return {
                vouchers: data,
                totalItems: totalItems
            };
        });

        promise.catch(response => this._log.error('Error was occured while getting voucher catalog data', response));

        return promise;
    }
}

export default VoucherCatalogListService;