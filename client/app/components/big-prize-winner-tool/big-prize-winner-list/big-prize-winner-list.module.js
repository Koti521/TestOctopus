import angular from 'angular';
import bigPrizeWinnerListComponent from './big-prize-winner-list.component';
import bigPrizeWinnerListService from './big-prize-winner-list.service';

let bigPrizeWinnerListModule = angular.module('big-prize-winner-list', [])
    .component('bigPrizeWinnerList', bigPrizeWinnerListComponent)
    .service('bigPrizeWinnerListService', bigPrizeWinnerListService);

export default bigPrizeWinnerListModule.name;