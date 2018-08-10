import angular from 'angular';
import uibModal from 'angular-ui-bootstrap/src/modal';
import ModalWindowService from './modal-window.service'

let modalWindowModule = angular.module('modal-window', [uibModal])
    .service('modalWindowService', ModalWindowService);

export default modalWindowModule.name;