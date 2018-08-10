import angular from 'angular';
import footerBarComponent from './footer-bar.component';

let footerBarModule = angular.module('footer-bar', [])
    .component('footerBar', footerBarComponent);

export default footerBarModule.name;