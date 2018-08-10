import angular from 'angular';
import missingTranscriptionsComponent from './missing-transcriptions.component';
import missingTranscriptionsGridModule from './missing-transcriptions-grid/missing-transcriptions-grid.module';

let missingTranscriptionsModule = angular.module('missing-transcriptions', [
    missingTranscriptionsGridModule
])
    .component('missingTranscriptions', missingTranscriptionsComponent)
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('missing-transcriptions', {
                url: '/missing-transcriptions',
                template: `<missing-transcriptions></missing-transcriptions>`
            });
    });

export default missingTranscriptionsModule.name;