class BulkShopLookupUpdaterController {

    constructor(ExtendedFileUploader, envConfig, appConfig, bulkErrorLogService, fileService, shopLookupService) {
        'ngInject';

        this._fileService = fileService;
        this._bulkErrorLogService = bulkErrorLogService;
        this._shopLookupService = shopLookupService;
        this.uploader = new ExtendedFileUploader({
            url: envConfig.apiBaseUrl + appConfig.shopLookupBulkLoadPath,
            removeAfterUpload: true
        });

        this.logUrl = envConfig.apiBaseUrl + appConfig.shopLookupBulkLoadLogPath;
    }

    $onInit() {
        this.uploader.appendAuthHeader();

        this.uploader.onCompleteItem = (fileItem, response) => {
            this.uploadResult = {};

            if (fileItem.isCancel) {
                this.uploadResult.errorMessage = 'Canceled by user.';
                return;
            }

            if (response.successMessagesCount !== undefined &&
                response.failureMessagesCount !== undefined) {
                this.uploadResult.successedMessage = response.successMessagesCount + ' records uploaded successfully';

                if (response.failureMessagesCount !== 0) {
                    this.uploadResult.errorMessage = response.failureMessagesCount + ' records encountered errors while uploading';
                    this.uploadResult.logUrl = this.logUrl + response.bulkId;
                    this.uploadResult.bulkId = response.bulkId;
                }
            } else {
                this.uploadResult.errorMessage = 'Invalid file format or uploading error';
            }
        };
    }

    saveFile(fileName, data){
        let byteArray =  Object.keys(data).map(key => data[key]);
        this._fileService.saveFile(byteArray, 'octet/stream', fileName);
    }
    
    saveLogFile(logId) {
        let promise = this._bulkErrorLogService.getBulkErrorLogFile('shoplookup', logId).then(result => {
            let data = result.logs.toJSON();
            this.saveFile(result.fileName, data);
        });

        return promise;
    }

    saveShopListFile() {
        let promise = this._shopLookupService.downloadFile().then(result => {
            let data = result.fileData.toJSON();
            this.saveFile(result.fileName, data);
        });

        return promise;
    }
}

export default BulkShopLookupUpdaterController;