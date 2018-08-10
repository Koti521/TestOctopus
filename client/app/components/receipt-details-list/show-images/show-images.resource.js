export default function ShowImagesResource($resource, envConfig) {
    'ngInject';

    return $resource(`${envConfig.apiBaseUrl}/api/admins/me/panellists/receipts/:receiptId/images`, { receiptId: '@receiptId' }, { 
        get: {
            method: 'GET',
            transformResponse: function(data, headers, statusCode) {
                return {
                    data: data,
                    statusCode: statusCode,
                    url: `${envConfig.apiBaseUrl}/api/admins/me/panellists/receipts/:receiptId/images`
                };
            }
        }
    });
}