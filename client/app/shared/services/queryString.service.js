class QueryStringService{
    constructor($location) {
        'ngInject';

        this._$location = $location;
    }

    getQuery() {
        return this._$location.search();
    }

    setQuery(queryString) {
        this._$location.search(queryString);
    }
}

export default QueryStringService;