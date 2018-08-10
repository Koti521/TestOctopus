import template from './missing-transcriptions-grid-date-filter.html';
import controller from './missing-transcriptions-grid-date-filter.controller';
import './missing-transcriptions-grid-date-filter.less';

const missingTranscriptionsGridDateFilterComponent = {
    restrict: 'E',
    bindings: {
        defaultFromDate: '<',
        defaultToDate: '<',
        onFilter: '&',
        onInvalidDataSpecified: '&'
    },
    template,
    controller,
    controllerAs: 'vm'
};

export default missingTranscriptionsGridDateFilterComponent;