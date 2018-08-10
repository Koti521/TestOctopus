const TotalItemsHeader = 'X-Total-Receipts-Count';

class MissingTranscriptionsGridService {
    constructor(missingTranscriptionsResource, $log, eventTraceService) {
        'ngInject';

        this._missingTranscriptionsResource = missingTranscriptionsResource;
        this._$log = $log;
        this._eventTraceService = eventTraceService;
    }

    getList(filter) {
        if (filter.pageNumber < 1) {
            throw new Error('Page number cannot be less than 1');
        }

        let totalItems;
        let promise = this._missingTranscriptionsResource.query({
            offset: (filter.pageNumber - 1) * filter.pageSize,
            numberOfItems: filter.pageSize,
            fromDate: filter.fromDate,
            toDate: filter.toDate
        }, (data, getHeaders) => {
            totalItems = getHeaders(TotalItemsHeader);
        }).$promise.then(data => {
            return {
                transcriptions: data,
                totalItems: totalItems
            };
        });

        promise.catch(response => this._$log.error('Error was occured while getting missing transcriptions data', response));

        return promise;
    }

    retry(receiptIds) {
        if (!receiptIds || !receiptIds.length || receiptIds.length == 0) {
            throw new Error('Receipt Ids input is is not valid or does not have elements');
        }

        let eventLogFunc = (response) => this._eventTraceService.trace('Retry missing transcription', JSON.stringify(receiptIds), 
            response.data, response.statusCode, response.url);

        let promise = this._missingTranscriptionsResource.retry(receiptIds).$promise
            .then(eventLogFunc)
            .catch((response) => {
                eventLogFunc(response.data);
                throw response;
            });

        return promise;
    }

    markAsFailed(receiptIds) {
        if (!receiptIds || !receiptIds.length || receiptIds.length == 0) {
            throw new Error('Receipt Ids input is is not valid or does not have elements');
        }

        let eventLogFunc = (response) => this._eventTraceService.trace('Mark missing transcription as failed', JSON.stringify(receiptIds), 
            response.data, response.statusCode, response.url);

        let promise = this._missingTranscriptionsResource.markAsFailed(receiptIds).$promise
            .then(eventLogFunc)
            .catch((response) => {
                eventLogFunc(response.data);
                throw response;
            });

        return promise;
    }
}

export default MissingTranscriptionsGridService;