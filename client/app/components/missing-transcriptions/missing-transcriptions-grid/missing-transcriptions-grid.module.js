import angular from 'angular';

import missingTranscriptionsGridComponent from './missing-transcriptions-grid.component';
import missingTranscriptionsGridService from './missing-transcriptions-grid.service.js';
import missingTranscriptionsResource from './missing-transcriptions.resource';
import missingTranscriptionsGridOptions from './missing-transcriptions-grid.const';

import missingTranscriptionsGridDateFilter from 
    './missing-transcriptions-grid-date-filter/missing-transcriptions-grid-date-filter.component';

let missingTranscriptionsGridModule = angular.module('missing-transcriptions-grid', [])
    .component('missingTranscriptionsGrid', missingTranscriptionsGridComponent)
    .component('missingTranscriptionsGridDateFilter', missingTranscriptionsGridDateFilter)
    .service('missingTranscriptionsGridService', missingTranscriptionsGridService)
    .factory('missingTranscriptionsResource', missingTranscriptionsResource)
    .constant('missingTranscriptionsGridOptions', missingTranscriptionsGridOptions);

export default missingTranscriptionsGridModule.name;