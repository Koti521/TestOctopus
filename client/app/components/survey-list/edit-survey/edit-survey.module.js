import angular from 'angular';

import editSurveyComponent from './edit-suvey.component';
import editSurveyService from './edit-survey.service';

let editSurveyModule = angular.module('edit-survey', [])
    .component('editSurvey', editSurveyComponent)
    .service('editSurveyService', editSurveyService);

export default editSurveyModule.name;