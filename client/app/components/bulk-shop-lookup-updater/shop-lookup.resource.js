export default function shopLookupResource($resource, envConfig) {
    'ngInject';
    return $resource(`${envConfig.apiBaseUrl}/api/admins/me/bulk_shoplookup`);
}