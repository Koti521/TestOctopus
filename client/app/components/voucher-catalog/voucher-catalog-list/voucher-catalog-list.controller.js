const addVoucherModalTemplate = 'add-update-voucher-template.html';

class VoucherCatalogListController {
    constructor(voucherCatalogListService, modalWindowService) {
        'ngInject';

        this._voucherCatalogListService = voucherCatalogListService;
        this._modalWindowService = modalWindowService;
    }

    $onInit() {
        this.filter = {
            pageNumber: 1,
            pageSize: 25
        };

        this.gridOptions = {
            paginationPageSizes: [this.filter.pageSize],
            paginationPageSize: this.filter.pageSize,
            paginationCurrentPage: this.filter.pageNumber,
            enableRowSelection: true,
            enableSorting: false,
            enableRowHeaderSelection: false,
            useExternalPagination: true,
            useExternalSorting: false,
            multiSelect: false,
            enableVerticalScrollbar: 0,
            enableHorizontalScrollbar: 0,
            data: [],
            columnDefs: [{
                field: 'id',
                displayName: 'Id',
                visible: false
            }, {
                field: 'name',
                displayName: 'Voucher Name',
                enableCellEdit: true,
                visible: true,
                width: '20%'
            }, {
                field: 'terms',
                displayName: 'Terms',
                enableCellEdit: true,
                visible: true
            }, {
                field: 'details',
                displayName: 'Details',
                enableCellEdit: true,
                visible: true
            }, {
                field: 'tokensPer1Pound',
                displayName: 'Tokens per £1',
                enableCellEdit: true,
                visible: true,
                width: '10%'
            }, {
                // UKABE-616 : Add VoucherValue field to Voucher Catalog on Admin UI
                field: 'voucherValue',
                displayName: 'Voucher Value',
                enableCellEdit: true,
                visible: true,
                width: '10%'
            }],
            onRegisterApi: (gridApi) => {
                gridApi.pagination.on.paginationChanged(null, newPage => {
                    if (newPage !== this.filter.pageNumber) {
                        this.filter.pageNumber = newPage;
                        this.refreshVouchers();
                    }
                });

                gridApi.selection.on.rowSelectionChanged(null, row => {
                    if (row.isSelected) {
                        this.selectedVoucher = row.entity;
                    } else {
                        this.selectedVoucher = undefined;
                    }
                });
            }
        };

        this.refreshVouchers();
    }

    refreshVouchers() {
        this._resetSelectedRow();
        return this._voucherCatalogListService.getVoucherCatalog(this.filter).then(result => {
            this.gridOptions.data = result.vouchers;
            this.gridOptions.totalItems = result.totalItems;
        });
    }

    addRow() {
        return this._modalWindowService.openTemplateDialog('Add voucher', undefined, addVoucherModalTemplate)
            .then(() => this.refreshVouchers())
            .catch(() => this.refreshVouchers());
    }

    removeRow() {
        if (this.selectedVoucher) {
            return this._modalWindowService.openConfirmationDialog('Confirmation', 'Are you sure? This item will be removed.')
                .then(() => {
                    this._voucherCatalogListService.deleteVoucher(this.selectedVoucher.id)
                        .then(() => this.refreshVouchers())
                        .catch((message) => this._modalWindowService.openInfoDialog('Voucher is not deleted.', message));
                });
        }
    }

    editRow() {
        if (this.selectedVoucher) {
            return this._modalWindowService.openTemplateDialog('Edit voucher', { voucher: this.selectedVoucher }, addVoucherModalTemplate)
                .then(() => this.refreshVouchers())
                .catch(() => this.refreshVouchers());
        }
    }

    _resetSelectedRow() {
        this.selectedVoucher = undefined;
    }
}

export default VoucherCatalogListController;