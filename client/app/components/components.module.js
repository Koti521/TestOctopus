import angular from 'angular';
import surveyListModule from './survey-list/survey-list.module';
import bigPrizeWinnerToolModule from './big-prize-winner-tool/big-prize-winner-tool.module';
import bulkLoadIncentivesModule from './bulk-load-incentives/bulk-load-incentives.module';
import bulkLoadReferralDetailsModule from './bulk-load-referraldetails/bulk-load-referraldetails.module';
import bulkLoadExclusionModule from './bulk-load-exclusion/bulk-load-exclusion.module';
import bulkLoadRemoveModule from './bulk-load-remove/bulk-load-remove.module';
import bulkLoadExpirydatesModule from './bulk-load-expirydates/bulk-load-expirydates.module';
import bulkLoadNotificationsModule from './bulk-load-notifications/bulk-load-notifications.module';
import bulkLoadInvitationsModule from './bulk-load-invitations/bulk-load-invitations.module';
import bulkLoadShopLookupModule from './bulk-shop-lookup-updater/bulk-shop-lookup-updater.module';
import bulkErrorLogModule from './bulk-error-log/bulk-error-log.module';
import voucherCatalogModule from './voucher-catalog/voucher-catalog.module';
import missingTranscriptionsModule from './missing-transcriptions/missing-transcriptions.module';
import receiptDetailsListModule from './receipt-details-list/receipt-details-list.module';

let componentsModule = angular.module('app.components', [
    surveyListModule,
    bigPrizeWinnerToolModule,
    bulkLoadIncentivesModule,
    bulkLoadReferralDetailsModule,
    bulkLoadNotificationsModule,
    bulkLoadInvitationsModule,
    bulkErrorLogModule,
    bulkLoadShopLookupModule,
    voucherCatalogModule,
    missingTranscriptionsModule,
    receiptDetailsListModule,
    bulkLoadExclusionModule,
    bulkLoadRemoveModule,
    bulkLoadExpirydatesModule
]);

export default componentsModule.name;