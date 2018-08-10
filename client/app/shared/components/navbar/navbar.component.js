import controller from './navbar.controller';
import template from './navbar.html';

const navbarComponent = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default navbarComponent;