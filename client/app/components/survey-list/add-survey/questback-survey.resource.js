export default function QuestbackSurveyResource($resource, envConfig) {
    'ngInject';

    return $resource(`${envConfig.apiBaseUrl}/api/admins/me/surveys/questback_survey/:id`, { id: '@id' }, { });
}