export default function VoucherCatalogResource($resource, envConfig) {
    'ngInject';

    return $resource(`${envConfig.apiBaseUrl}/api/admins/me/voucher_reference`, {}, {
        add: {
            method: 'POST',
            transformResponse: function(data, headers, statusCode) {
                return {
                    model: data,
                    statusCode: statusCode,
                    url: `${envConfig.apiBaseUrl}/api/admins/me/voucher_reference`
                };
            }
        },
        edit: {
            method: 'PUT',
            url: `${envConfig.apiBaseUrl}/api/admins/me/voucher_reference/:voucherReferenceId`,
            params: { voucherReferenceId: '@voucherReferenceId' },
            transformResponse: function(data, headers, statusCode) {
                return {
                    model: data,
                    statusCode: statusCode,
                    url: `${envConfig.apiBaseUrl}/api/admins/me/voucher_reference/:voucherReferenceId`
                };
            }
        },
        get: {
            method: 'GET',
            transformResponse: function(data, headers, statusCode) {
                return {
                    model: data,
                    statusCode: statusCode,
                    url: `${envConfig.apiBaseUrl}/api/admins/me/voucher_reference`
                };
            }
        },
        delete: {
            method: 'DELETE',
            url: `${envConfig.apiBaseUrl}/api/admins/me/voucher_reference/:voucherReferenceId`,
            params: { voucherReferenceId: '@voucherReferenceId' },
            transformResponse: function(data, headers, statusCode) {
                return {
                    model: data,
                    statusCode: statusCode,
                    url: `${envConfig.apiBaseUrl}/api/admins/me/voucher_reference/:voucherReferenceId`
                };
            }
        }
    });
}