import angular from 'angular';

import addSurveyComponent from './add-survey.component';
import addSurveyService from './add-survey.service';
import questbackSurveyResource from './questback-survey.resource';

let addSurveyModule = angular.module('add-survey', [])
    .component('addSurvey', addSurveyComponent)
    .service('addSurveyService', addSurveyService)
    .factory('questbackSurveyResource', questbackSurveyResource);

export default addSurveyModule.name;