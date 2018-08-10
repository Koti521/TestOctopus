class ReceiptDetailsListService {
    constructor(receiptDetailsListResource, $log) {
        'ngInject';

        this._receiptDetailsListResource = receiptDetailsListResource;
        this._$log = $log;
        this._totalItemsHeader = 'X-Total-Receipt-Details-Count';
    }

    getList(filter) {
        if (filter.pageNumber < 1) {
            throw new Error('Page number cannot be less than 1');
        }
        if (!filter.searchParameterValue) {
            throw new Error('Text box cannot be empty');
        }
        if (filter.searchParameterName=='SHORTID' && isNaN(filter.searchParameterValue)) {
            document.getElementById('validationDiv').style.display = 'block';    
            document.getElementById('lblValidation').innerHTML= 'The short id must be a numeric value';
            throw new Error('The shortId must be a numeric value');
        }
        else{
            document.getElementById('validationDiv').style.display = 'none';
            document.getElementById('lblValidation').innerHTML= '';
        }

        let totalItems;
        let promise = this._receiptDetailsListResource.query({
            offset: (filter.pageNumber - 1) * filter.pageSize,
            numberOfItems: filter.pageSize,
            searchParameterValue: filter.searchParameterValue,
            searchParameterName: filter.searchParameterName,
            receiptType: filter.receiptType
        }, (data, getHeaders) => {
            totalItems = getHeaders(this._totalItemsHeader);
        }).$promise.then(data => {
            return {
                receiptDetails: data,
                totalItems: totalItems
            };
        });
        promise.catch(response => this._$log.info('Error was occured while getting receipt details list', response));

        return promise;
    }
}

export default ReceiptDetailsListService;