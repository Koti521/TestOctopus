export default function MissingTranscriptionsResource($resource, envConfig) {
    'ngInject';

    return $resource(`${envConfig.apiBaseUrl}/api/admins/me/receipts/missing_transcription_responses`, {}, {
        markAsFailed: {
            method: 'PUT',
            url: `${envConfig.apiBaseUrl}/api/admins/me/receipts/transcription_failed`,
            transformResponse: function(data, headers, statusCode) {
                return {
                    data: data,
                    statusCode: statusCode,
                    url: `${envConfig.apiBaseUrl}/api/admins/me/receipts/transcription_failed`
                };
            }
        },
        retry: {
            method: 'POST',
            url: `${envConfig.apiBaseUrl}/api/admins/me/receipts/retry_transcription`,
            transformResponse: function(data, headers, statusCode) {
                return {
                    data: data,
                    statusCode: statusCode,
                    url: `${envConfig.apiBaseUrl}/api/admins/me/receipts/transcription_failed`
                };
            }
        }
    });
}