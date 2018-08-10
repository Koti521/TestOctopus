class ReceiptDetailsListController {

    constructor(receiptDetailsListService, modalWindowService, queryStringService, receiptGridOptions) {
        'ngInject';

        this._receiptDetailsListService = receiptDetailsListService;
        this._modalWindowService = modalWindowService;
        this._queryStringService = queryStringService;
        this._receiptGridOptions = receiptGridOptions;
    }

    $onInit() {
        this.selectedReceiptDetails = undefined;

        let filterFromQueryString = this._queryStringService.getQuery();
        let receiptType = {
            All: {
                value: 'ALL',
                numericalEquivalent: -1
            },
            Paper: {
                value: 'PAPER RECEIPT',
                numericalEquivalent: 0
            },
            Ereceipt: {
                value: 'E-RECEIPT',
                numericalEquivalent: 1
            }
        };
        this.filter = {
            pageNumber: parseInt(filterFromQueryString.pageNumber) || this._receiptGridOptions.defaultPageNumber,
            pageSize: this._receiptGridOptions.availablePageSizes.includes(parseInt(filterFromQueryString.pageSize)) ?
                parseInt(filterFromQueryString.pageSize) : this._receiptGridOptions.defaultPageSize,
            searchParameterValue: filterFromQueryString.searchParameterValue,
            searchParameterName: filterFromQueryString.searchParameterName
        };

        this.gridOptions = {
            enableColumnResizing: true,
            paginationPageSizes: this._receiptGridOptions.availablePageSizes,
            paginationPageSize: this.filter.pageSize,
            paginationCurrentPage: this.filter.pageNumber,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            useExternalPagination: true,
            useExternalSorting: true,
            multiSelect: false,
            enableHorizontalScrollbar: 0,
            virtualizationThreshold: 100,
            enableFiltering: true,
            useExternalFiltering: true,
            columnDefs: [{
                field: 'receiptType',
                displayName: 'Receipt Type',
                enableSorting: false,
                width: '*',
                visible: true,
                filterHeaderTemplate: '<div receipt-type-dropdown-component></div>',
                filter: this.getGridFilterFromQueryString(receiptType, filterFromQueryString)
            }, {
                enableSorting: false,
                field: 'createdAt',
                displayName: 'Receipt Created Date/Time',
                cellFilter: 'date:\'yyyy-MM-dd HH:mm\'',
                width: '*',
                visible: true,
                enableFiltering: false
            }, {
                field: 'purchaseDateTime',
                displayName: 'Receipt Date/Time',
                enableSorting: false,
                cellFilter: 'date:\'yyyy-MM-dd HH:mm\'',
                width: '*',
                visible: true,
                enableFiltering: false
            }, {
                field: 'shopName',
                displayName: 'Shop Name',
                enableSorting: false,
                width: '*',
                visible: true,
                enableFiltering: false
            }, {
                field: 'total',
                displayName: 'Total',
                enableSorting: false,
                width: '*',
                visible: true,
                enableFiltering: false
            }, {
                field: 'lastInternalStatus',
                displayName: 'Internal Status',
                enableSorting: false,
                width: '20%',
                visible: true,
                enableFiltering: false
            }, {
                field: 'reason',
                displayName: 'Reason',
                enableSorting: false,
                width: '20%',
                visible: true,
                enableFiltering: false
            }, {
                field: 'status',
                displayName: 'External Status',
                enableSorting: false,
                width: '*',
                visible: true,
                enableFiltering: false
            }],
            onRegisterApi: (gridApi) => {
                this.gridApi = gridApi;
                gridApi.pagination.on.paginationChanged(null, (newPage, pageSize) => {
                    this.filter.pageNumber = newPage;
                    this.filter.pageSize = pageSize;
                    this.refreshReceiptDetails();
                });
                gridApi.selection.on.rowSelectionChanged(null, row => {
                    if (row.isSelected) {
                        this.selectedReceiptDetails = row.entity;
                    } else {
                        this.selectedReceiptDetails = undefined;
                    }
                });
                gridApi.core.on.filterChanged(null, () => {
                    this.filter.pageNumber = 1;
                    var currentReceiptType = gridApi.grid.columns[0].filters[0].term;
                    this.filter.receiptType = currentReceiptType;
                    this._resetPageNumber();
                    this.refreshReceiptDetails();
                });
            }
        };

        if (this.filter.searchParameterName && this.filter.searchParameterValue) {
            this.refreshReceiptDetails();
        }
    }

    refreshReceiptDetails() {
        this.gridOptions.data = undefined;
        let promise = this._receiptDetailsListService.getList(this.filter)
            .then(result => {
                this.gridOptions.data = result.receiptDetails;
                this.gridOptions.totalItems = +result.totalItems;
                this.notFound = false;
            })
            .then(() => {
                // setup query string with updated filter
                this._queryStringService.setQuery(this.filter);
            })
            .catch(() => {
                this.notFound = true;
            });

        return promise;
    }

    searchAppUser() {
        if (this.gridOptions.data) {
            this._resetPageNumber();
        }
        this.refreshReceiptDetails();
    }

    showImages() {
        this._modalWindowService.open(
            'Show images', { receiptId: this.selectedReceiptDetails.receiptId },
            'show-images-template.html', { size: 'xxl' })
    }

    getGridFilterFromQueryString(receiptType, filterFromQueryString) {
        var gridFilter = {
            term: receiptType.All.numericalEquivalent,
            options: [
                { id: receiptType.All.numericalEquivalent, value: receiptType.All.value },
                { id: receiptType.Paper.numericalEquivalent, value: receiptType.Paper.value },
                { id: receiptType.Ereceipt.numericalEquivalent, value: receiptType.Ereceipt.value }
            ]
        };
        if (filterFromQueryString.receiptType == receiptType.Paper.numericalEquivalent) {
            gridFilter.term = receiptType.Paper.numericalEquivalent;
            this.filter.receiptType = receiptType.Paper.numericalEquivalent;
        } else if (filterFromQueryString.receiptType == receiptType.Ereceipt.numericalEquivalent) {
            gridFilter.term = receiptType.Ereceipt.numericalEquivalent;
            this.filter.receiptType = receiptType.Ereceipt.numericalEquivalent;
        } else {
            gridFilter.term = receiptType.All.numericalEquivalent;
            this.filter.receiptType = receiptType.All.numericalEquivalent;
        }

        return gridFilter;
    }

    _resetPageNumber() {
        this.filter.pageNumber = this._receiptGridOptions.defaultPageNumber;
        this.gridOptions.paginationCurrentPage = this._receiptGridOptions.defaultPageNumber;
        this.gridApi.core.notifyDataChange('options');
    }
}

export default ReceiptDetailsListController;