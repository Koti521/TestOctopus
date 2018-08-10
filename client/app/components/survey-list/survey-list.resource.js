export default function SurveyListResource($resource, envConfig) {
    'ngInject';

    return {
        surveyStatus: $resource(`${envConfig.apiBaseUrl}/api/admins/me/surveys/:surveyId/status/launched`, {surveyId:'@surveyId'}, {
            launchSurvey: {
                method: 'PUT',
                isArray: false,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                transformResponse: function(data, headers, statusCode) {

                    return {
                        data: data,
                        statusCode: statusCode,
                        url: `${envConfig.apiBaseUrl}/api/admins/me/surveys/:surveyId/status/launched`
                    };
                }
            }
        }),
        status: $resource(`${envConfig.apiBaseUrl}/api/admins/me/surveys/:surveyId/status/deactivated`, {surveyId:'@surveyId'}, {
            deactivateSurvey: {
                method: 'PUT',
                isArray: false,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                transformResponse: function(data, headers, statusCode) {

                    return {
                        data: data,
                        statusCode: statusCode,
                        url: `${envConfig.apiBaseUrl}/api/admins/me/surveys/:surveyId/status/deactivated`
                    };
                }
            }
        }),
        surveyUsers: $resource(`${envConfig.apiBaseUrl}/api/admins/me/surveys/:surveyId/users`, {surveyId:'@surveyId'}, {
            refresh: {
                method: 'PUT',
                isArray: false,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                transformResponse: function(data, headers, statusCode) {

                    return {
                        data: data,
                        statusCode: statusCode,
                        url: `${envConfig.apiBaseUrl}/api/admins/me/surveys/:surveyId/users`
                    };
                }
            }
        })
    };
}