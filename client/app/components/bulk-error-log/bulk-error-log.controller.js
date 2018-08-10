import cellTemplate from './cellTemplateLink.html'

class BulkErrorLogController {

    constructor(bulkErrorLogService, envConfig, fileService) {
        'ngInject';

        this._bulkErrorLogService = bulkErrorLogService;
        this._envConfig = envConfig;
        this._fileService = fileService;
    }

    $onInit() {

        if (this.target === undefined) {
            throw new Error('Bulk error log type is not defined.');
        }

        this.isNullOrEmpty = function (value) {
            let isNullOrEmptyFlag = true;
            if (value && typeof (value) == 'string' && value.length > 0) {
                isNullOrEmptyFlag = false;
            }

            return isNullOrEmptyFlag;
        };

        this.gridOptions = {
            appScopeProvider: this,
            enableColumnResizing: true,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            useExternalSorting: true,
            multiSelect: false,
            enableHorizontalScrollbar: 0,
            virtualizationThreshold: 100,
            data: [],
            columnDefs: [
                {
                    field: 'uploadedDateTime',
                    displayName: 'Uploaded Date/Time',
                    enableSorting: false,
                    cellFilter: 'date:\'yyyy/MM/dd HH:mm\'',
                    width: '*',
                    visible: true
                }, {
                    field: 'batchDateTime',
                    displayName: 'Batch Date/Time',
                    enableSorting: false,
                    cellFilter: 'date:\'yyyy/MM/dd HH:mm\'',
                    width: '*',
                    visible: true
                }, {
                    field: 'errorLogFile',
                    displayName: 'Error Log File',
                    enableSorting: false,
                    width: '*',
                    visible: true,
                    cellTemplate: cellTemplate
                }, {
                    field: 'numberOfErrorRecords',
                    displayName: 'Number of Error Records',
                    enableSorting: false,
                    width: '*',
                    visible: true
                }]
        };

        this.refreshLogs();
    }

    refreshLogs() {
        let promise = this._bulkErrorLogService.getBulkErrorLog(this.target).then(result => {
            this.buildLink(result.logs);
            this.gridOptions.data = result.logs;
        });

        return promise;
    }

    buildLink(logs) {
        for (let i = 0; i < logs.length; i++) {
            logs[i].errorLogFile = this._envConfig.apiBaseUrl +
                '/api/admins/me/logs/' +
                logs[i].bulkId +
                '?type=bulk_upload&target=' +
                this.target;
        }
    }

    saveFile(logId) {
        let promise = this._bulkErrorLogService.getBulkErrorLogFile(this.target, logId).then(result => {
            let data = result.logs.toJSON();
            let byteArray =  Object.keys(data).map(key => data[key]);
            this._fileService.saveFile(byteArray, 'octet/stream', result.fileName);
        });

        return promise;
    }
}

export default BulkErrorLogController;