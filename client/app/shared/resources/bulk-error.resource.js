export default function bulkErrorLogResource($resource, envConfig) {
    'ngInject';

    return $resource(`${envConfig.apiBaseUrl}/api/admins/me/logs/:logId`, { logId: '@logId', target: '@target', type: '@type' }, { });
}