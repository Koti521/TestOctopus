import template from './missing-transcriptions-grid.html';
import controller from './missing-transcriptions-grid.controller';
import './missing-transcriptions-grid.less';

const missingTranscriptionsGridComponent = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default missingTranscriptionsGridComponent;