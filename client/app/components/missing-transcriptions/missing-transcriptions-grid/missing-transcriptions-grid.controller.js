const DefaultFromDate = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());
const DefaultToDate = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 23, 59);

class MissingTranscriptionsGridController {
    constructor(missingTranscriptionsGridService, missingTranscriptionsGridOptions, appConfig, $filter, queryStringService, 
        modalWindowService) {
        'ngInject';

        this._missingTranscriptionsGridService = missingTranscriptionsGridService;
        this._missingTranscriptionsGridOptions = missingTranscriptionsGridOptions;
        this._appConfig = appConfig;
        this._$filter = $filter;
        this._queryStringService = queryStringService;
        this._modalWindowService = modalWindowService;
    }

    $onInit() {
        this.dateTimeFormat = this._appConfig.dateTimeFormat;

        let filterQueryString = this._parseQueryStringFilter();

        this.filter = {
            pageNumber: filterQueryString.pageNumber || this._missingTranscriptionsGridOptions.defaultPageNumber,
            pageSize: filterQueryString.pageSize || this._missingTranscriptionsGridOptions.defaultPageSize,
            fromDate: this._$filter('date')(filterQueryString.fromDate || DefaultFromDate, this.dateTimeFormat),
            toDate: this._$filter('date')(filterQueryString.toDate || DefaultToDate, this.dateTimeFormat)
        };

        this.gridOptions = {
            paginationPageSizes: this._missingTranscriptionsGridOptions.availablePageSizes,
            paginationPageSize: this.filter.pageSize,
            paginationCurrentPage: this.filter.pageNumber,
            enableRowSelection: true,
            enableSelectAll: true,
            enableSorting: false,
            enableRowHeaderSelection: true,
            useExternalPagination: true,
            multiSelect: true,
            selectionRowHeaderWidth: 35,
            enableHorizontalScrollbar: 0,
            virtualizationThreshold: 100,
            data: [],
            showGridFooter:true,
            columnDefs: [{
                field: 'receiptCreatedDateTime',
                displayName: 'Receipt Created Date/Time',
                cellFilter: `date:\'yyyy-MM-dd HH:mm\'`,
                visible: true,
                width: '20%'
            }, {
                field: 'transcriptionType',
                displayName: 'Transcription Type',
                visible: true
            }, {
                field: 'appUserShortId',
                displayName: 'App User Short ID',
                visible: true
            }, {
                field: 'receiptId',
                displayName: 'Receipt ID',
                visible: true,
                width: '30%'
            }],
            onRegisterApi: (gridApi) => {
                this._gridApi = gridApi;

                gridApi.pagination.on.paginationChanged(null, (newPage, pageSize) => {
                    this.filter.pageNumber = newPage;
                    this.filter.pageSize = pageSize;
                    this.refreshTranscriptions();
                });
            }
        };

        this.refreshTranscriptions();
    }

    refreshTranscriptions() {
        let promise = this._missingTranscriptionsGridService.getList(this.filter).then((result) => {
            this.gridOptions.data = result.transcriptions;
            this.gridOptions.totalItems = result.totalItems;
        }).then(() => {
            this._queryStringService.setQuery(this.filter);
        });

        return promise;
    }

    filterTranscriptionsByDate(fromDate, toDate) {
        this.filter.fromDate = fromDate;
        this.filter.toDate = toDate;

        return this.refreshTranscriptions();
    }

    selectAll() {
        this._gridApi.selection.selectAllRows();
        this._gridApi.selection.getSelectedGridRows();
    }

    deselectAll() {
        this._gridApi.selection.clearSelectedRows();
    }

    retry() {
        let selectedReceiptIds = this._getSelectedReceiptIds();

        return this._missingTranscriptionsGridService.retry(selectedReceiptIds).then(() => {
            this._modalWindowService.openInfoDialog('Info', 'Missing transcriptions have been resent again into OCR.');
            return this.refreshTranscriptions();
        });
    }

    retryDisable() {
        return this._gridApi.selection.getSelectedCount() === 0;
    }

    markAsFailed() {
        let selectedReceiptIds = this._getSelectedReceiptIds();

        return this._missingTranscriptionsGridService.markAsFailed(selectedReceiptIds).then(() => {
            this._modalWindowService.openInfoDialog('Info', 'Missing transcriptions have been marked as failed.');
            return this.refreshTranscriptions();
        });
    }

    markAsFailedDisable() {
        return this._gridApi.selection.getSelectedCount() === 0;
    }

    showInvalidDateMessage() {
        this._modalWindowService.openInfoDialog('Error', 'Invalid date range was specified. Please enter valid values.');
    }

    _getSelectedReceiptIds() {
        let selectedRows = this._gridApi.selection.getSelectedGridRows();
        let selectedReceiptIds = selectedRows.map((selectedRow) => {
            return selectedRow.entity.receiptId;
        });
        return selectedReceiptIds;
    }

    _parseQueryStringFilter() {
        let filterFromQueryString = this._queryStringService.getQuery();

        let parsedFromDate = Date.parse(filterFromQueryString.fromDate);
        let parsedToDate = Date.parse(filterFromQueryString.toDate);
        if (isNaN(parsedFromDate) || isNaN(parsedToDate) || parsedFromDate > parsedToDate) {
            parsedFromDate = null;
            parsedToDate = null;
        }

        let parsedPageNumber = parseInt(filterFromQueryString.pageNumber)
        if (!parsedPageNumber || parsedPageNumber < 1) {
            parsedPageNumber = null;
        }

        let parsedPageSize = parseInt(filterFromQueryString.pageSize);
        if (!parsedPageSize || !this._missingTranscriptionsGridOptions.availablePageSizes.includes(parsedPageSize)) {
            parsedPageSize = null;
        }

        return { 
            fromDate: parsedFromDate, 
            toDate: parsedToDate, 
            pageNumber: parsedPageNumber, 
            pageSize: parsedPageSize 
        };
    }
}

export default MissingTranscriptionsGridController;