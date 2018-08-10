class ShopLookupService{
    constructor(shopLookupResource, $log) {
        'ngInject';

        this._shopLookupResource = shopLookupResource;
        this._$log = $log;
    }

    downloadFile() {
        let fileName;
        let promise = this._shopLookupResource
            .get({}, 
            (data, getHeaders) => {
                let contentDisposition = getHeaders('content-disposition');
                fileName = this.getFileNameFromContentDisposition(contentDisposition);
            })
            .$promise
            .then(data => {
                return {
                    fileData: data,
                    fileName: fileName
                };
            });
        promise.catch(response => this._$log.error(`Error was occured while getting Shopname Lookup Table.`, response));

        return promise;    
    }

    getFileNameFromContentDisposition(contentDisposition) {
        var fileNameParameter = 'filename=';
        let startIndex = contentDisposition.indexOf(fileNameParameter) + fileNameParameter.length;
        let endIndex = contentDisposition.length;

        return contentDisposition.substring(startIndex, endIndex);
    }
}

export default ShopLookupService;