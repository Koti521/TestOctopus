export default function ReceiptDetailsListResource($resource, envConfig) {
    'ngInject';

    return $resource(`${envConfig.apiBaseUrl}/api/admins/me/panellists/receipts`);
}