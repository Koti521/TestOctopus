class BulkErrorLogService {
    constructor(bulkErrorLogResource, $log) {
        'ngInject';

        this._bulkErrorLogResource = bulkErrorLogResource;
        this._$log = $log;
    }

    getBulkErrorLog(target) {
        let promise = this._bulkErrorLogResource
            .query({
                type: 'bulk_upload',
                target: target
            })
            .$promise
            .then(data => {
                return {
                    logs: data
                };
            });
        promise.catch(response => this._$log.error(`Error was occured while getting ${target} logs`, response));

        return promise;
    }

    getBulkErrorLogFile(target, logId) {
        let fileName;
        let promise = this._bulkErrorLogResource
            .get({
                type: 'bulk_upload',
                target: target,
                logId: logId
            }, () => {
                var d = new Date();
                var n=d.getUTCFullYear()+'-'+d.getUTCMonth()+'-'+d.getUTCDate()+'_'+d.getUTCHours()+':'+d.getUTCMinutes()
                fileName=n+'_ErrorLog.csv';
            })
            .$promise
            .then(data => {
                return {
                    logs: data,
                    fileName: fileName
                };
            });
        promise.catch(response => this._$log.error(`Error was occured while getting ${target} logs`, response));

        return promise;
    }

    getFileNameFromContentDisposition(contentDisposition) {
        let startIndex = contentDisposition.indexOf('filename="') + 'filename="'.length;
        let endIndex = contentDisposition.indexOf('"', startIndex);

        return contentDisposition.substring(startIndex, endIndex);
    }
}

export default BulkErrorLogService;