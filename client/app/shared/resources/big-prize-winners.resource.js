export default function BigPrizeWinnerListResource($resource, envConfig) {
    'ngInject';

    return $resource(`${envConfig.apiBaseUrl}/api/admins/me/big_prize_winners`, {}, {
        getWinnerData: {
            method: 'GET',
            isArray: false
        },
        savePublishedWinners: {
            method: 'POST',
            isArray: true
        }
    });
}