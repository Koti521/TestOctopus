class BulkLoadIncentivesController {

    constructor(ExtendedFileUploader, envConfig, appConfig, bulkErrorLogService, fileService) {
        'ngInject';

        this._fileService = fileService;
        this._bulkErrorLogService = bulkErrorLogService;
        this.uploader = new ExtendedFileUploader({
            url: envConfig.apiBaseUrl + appConfig.incentiveBulkLoadPath,
            removeAfterUpload: true
        });

        this.logUrl = envConfig.apiBaseUrl + appConfig.incentiveBulkLoadLogPath;
    }

    $onInit() {
        this.uploader.appendAuthHeader();

        this.uploader.onCompleteItem = (fileItem, response, status) => {
            this.uploadResult = {};

            if (fileItem.isCancel) {
                this.uploadResult.errorMessage = 'Canceled by user.';
                return;
            }

            if (status === 200) {
                this.uploadResult.successedMessage = 'Upload completed';
            } else {
                this.uploadResult.errorMessage = 'Invalid file format or uploading error';
            }
        };
    }

    saveFile(logId) {
        let promise = this._bulkErrorLogService.getBulkErrorLogFile('incentive', logId).then(result => {
            let data = result.logs.toJSON();
            let byteArray =  Object.keys(data).map(key => data[key]);
            this._fileService.saveFile(byteArray, 'octet/stream', result.fileName);
        });

        return promise;
    }

}

export default BulkLoadIncentivesController;