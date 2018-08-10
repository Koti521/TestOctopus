import angular from 'angular';

import 'angular-ui-grid/ui-grid.css';
import './ui-grid-customization.less';

import 'angular-ui-grid/ui-grid';

let uiGridAdapterModule = angular.module('ui-grid-adapter', [
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.selection',
    'ui.grid.pagination',
    'ui.grid.autoResize'
]);

export default uiGridAdapterModule.name;