import './bulk-error-log.less';
import template from './bulk-error-log.html';
import controller from './bulk-error-log.controller';

const bulkErrorLogComponent = {
    template,
    controller,
    controllerAs: 'vm',
    bindings: {
        target: '@',
        label: '@'
    }
};

export default bulkErrorLogComponent;