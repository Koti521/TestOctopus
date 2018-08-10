const bigPrizeWinnerPublisherService = ($http, $resource, envConfig) => {
    return {
        get: $resource(`${envConfig.apiBaseUrl}/api/rewards/winners`, {}, {
            query: {
                method: 'GET',
                isArray: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'X-API-Version': 'v2.0.0'
                }
            }
        }),
        post: $resource(`${envConfig.apiBaseUrl}/api/admins/me/big_prize_winners`, {}, {
            post: {
                method: 'POST',
                isArray: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        })
    };
};

bigPrizeWinnerPublisherService.$inject = ['$http', '$resource', 'envConfig'];

export default bigPrizeWinnerPublisherService;