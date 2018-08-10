export default function SurveysResource($resource, envConfig) {
    'ngInject';

    return $resource(`${envConfig.apiBaseUrl}/api/admins/me/surveys/:surveyId`, { surveyId: '@id' }, { 
        update: {
            method: 'PUT',
            transformResponse: function(data, headers, statusCode) {

                return {
                    data: data,
                    statusCode: statusCode,
                    url: `${envConfig.apiBaseUrl}/api/admins/me/surveys/`
                };
            }
        },
        save: {
            method: 'POST',
            transformResponse: function(data, headers, statusCode) {

                return {
                    data: data,
                    statusCode: statusCode,
                    url: `${envConfig.apiBaseUrl}/api/admins/me/surveys/`
                };
            }
        }
    });
}