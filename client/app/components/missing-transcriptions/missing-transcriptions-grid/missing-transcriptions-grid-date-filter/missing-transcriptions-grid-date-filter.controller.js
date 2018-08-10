class MissingTranscriptionsGridDateFilterController {
    constructor(appConfig, $filter) {
        'ngInject';

        this._$filter = $filter;
        this._appConfig = appConfig;
    }

    $onInit() {
        this.dateTimeFormat = this._appConfig.dateTimeFormat;

        this.fromDate = this._$filter('date')(this.defaultFromDate, this.dateTimeFormat);
        this.toDate = this._$filter('date')(this.defaultToDate, this.dateTimeFormat);
        this.maxDate = new Date().toISOString();
    }

    submitFilter() {
        if (this.onInvalidDataSpecified && !this._isDateRangeValid(this.fromDate, this.toDate)) {
            this.onInvalidDataSpecified();
            return;
        }

        if (this.onFilter && typeof this.onFilter == 'function') {
            this.onFilter({ fromDate: this.fromDate, toDate: this.toDate });
        }
    }

    _isDateRangeValid(fromDate, toDate) {
        let parsedFromDate = Date.parse(fromDate);
        let parsedToDate = Date.parse(toDate);

        return !isNaN(parsedFromDate) && !isNaN(parsedToDate) && parsedFromDate <= parsedToDate;
    }
}

export default MissingTranscriptionsGridDateFilterController;