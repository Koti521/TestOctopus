import angular from 'angular';
import addSurveyModule from './add-survey/add-survey.module';
import editSurveyModule from './edit-survey/edit-survey.module';

import surveyListComponent from './survey-list.component';
import surveyListService from './survey-list.service';
import surveyListResource from './survey-list.resource';
import { surveyStatus, gridOptions } from './survey-list.const';

let surveyListModule = angular.module('survey-list', [
    addSurveyModule,
    editSurveyModule
])
    .component('surveyList', surveyListComponent)
    .service('surveyListService', surveyListService)
    .factory('surveyListResource', surveyListResource)
    .constant('surveyStatus', surveyStatus)
    .constant('gridOptions', gridOptions)

    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('survey-list', {
                url: '/survey-list',
                template: `<survey-list></survey-list>`
            });
    });

export default surveyListModule.name;