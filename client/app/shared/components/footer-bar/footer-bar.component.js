import controller from './footer-bar.controller';
import template from './footer-bar.html';
import './footer-bar.less';

const footerBarComponent = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default footerBarComponent;