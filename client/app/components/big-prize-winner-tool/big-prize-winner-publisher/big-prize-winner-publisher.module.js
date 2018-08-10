import angular from 'angular';
import bigPrizeWinnerPublisherComponent from './big-prize-winner-publisher.component';
import bigPrizeWinnerPublisherService from './big-prize-winner-publisher.service';

let bigPrizeWinnerPublisherModule = angular.module('big-prize-winner-publisher', [])
    .component('bigPrizeWinnerPublisher', bigPrizeWinnerPublisherComponent)
    .service('bigPrizeWinnerPublisherService', bigPrizeWinnerPublisherService);

export default bigPrizeWinnerPublisherModule.name;
