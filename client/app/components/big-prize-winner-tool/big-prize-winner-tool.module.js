import angular from 'angular';
import bigPrizeWinnerListModule from './big-prize-winner-list/big-prize-winner-list.module';
import bigPrizeWinnerPublisherModule from './big-prize-winner-publisher/big-prize-winner-publisher.module';
import bigPrizeWinnerToolComponent from './big-prize-winner-tool.component';

let bigPrizeWinnerToolModule = angular.module('big-prize-winner-tool', [
    bigPrizeWinnerListModule,
    bigPrizeWinnerPublisherModule
])
    .component('bigPrizeWinnerTool', bigPrizeWinnerToolComponent)    
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('big-prize-winner-tool', {
                url: '/big-prize-winner-tool',
                template: `<big-prize-winner-tool></big-prize-winner-tool>`
            });
    });

export default bigPrizeWinnerToolModule.name;