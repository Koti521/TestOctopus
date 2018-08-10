class BulkLoadNotificationsController {

    constructor(
        ExtendedFileUploader, envConfig, appConfig, bulkErrorLogService, fileService, eventTraceService) {
        'ngInject';

        this._fileService = fileService;
        this._bulkErrorLogService = bulkErrorLogService;
        this._eventTraceService = eventTraceService;
        this.uploader = new ExtendedFileUploader({
            url: envConfig.apiBaseUrl + appConfig.notificationBulkLoadPath,
            removeAfterUpload: true
        });

        this.logUrl = envConfig.apiBaseUrl + appConfig.notificationBulkLoadLogPath;
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

                this._eventTraceService.trace(
                    'Bulk notification sending', angular.toJson(fileItem.file), angular.toJson(response), status, fileItem.url);
            } else {
                this.uploadResult.errorMessage = 'Invalid file format or uploading error';
            }
        };
    }

    saveFile(logId) {
        let promise = this._bulkErrorLogService.getBulkErrorLogFile('notification', logId).then(result => {
            let data = result.logs.toJSON();
            let byteArray =  Object.keys(data).map(key => data[key]);
            this._fileService.saveFile(byteArray, 'octet/stream', result.fileName);
        });

        return promise;
    }

}

export default BulkLoadNotificationsController;