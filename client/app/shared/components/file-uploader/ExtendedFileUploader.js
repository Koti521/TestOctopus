export default (FileUploader, adalAuthenticationService, $q) => {
    'ngInject';

    let buildAuthHeader = (token) => {
        return 'Bearer ' + token;
    }

    FileUploader.prototype.appendAuthHeader = function () {
        let uploader = this;

        if (uploader.url === undefined) {
            throw new Error('Url is undefined.');
        }
        console.log('uploader.url:'+uploader.url);
        let resource = adalAuthenticationService.getResourceForEndpoint(uploader.url);
        console.log('resource:'+resource);
        let cachedToken = adalAuthenticationService.getCachedToken(resource);
        console.log('cachedToken:'+cachedToken);

        let getTokenPromise = cachedToken ? $q.when(cachedToken) : adalAuthenticationService.acquireToken(resource);
        console.log('getTokenPromise:'+getTokenPromise);

        return getTokenPromise.then((token) => {
            uploader.headers = Object.assign({}, uploader.headers, {
                Authorization: buildAuthHeader(token)
            });
        }).catch((error) => {
            adalAuthenticationService.info('Unable to append auth header to file uploader', error);
        });
    }

    return FileUploader
}