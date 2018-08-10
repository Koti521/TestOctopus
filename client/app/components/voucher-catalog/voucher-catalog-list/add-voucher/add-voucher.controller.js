class AddVoucherController {
    constructor(voucherCatalogListService, modalWindowService, $scope) {
        'ngInject';

        this._voucherCatalogListService = voucherCatalogListService;
        this._modalWindowService = modalWindowService;
        this._scope = $scope;
    }

    $onInit() {
        if (!this.voucher) {
            this.voucher = {
                name: '',
                terms: '',
                details: '',
                tokensPer1Pound: undefined,
                voucherValue: null
                // UKABE-616 : Add VoucherValue field to Voucher Catalog on Admin UI
            };
        }

        this.numericPattern = '\\d+';

        this._scope.$on('modal.closing', (event, reason) => {
            if (reason === 'cancel' || reason === 'escape key press') {
                let formIsDirty = this._scope.voucherform.$dirty;
                if (reason !== 'leave' && formIsDirty) {
                    event.preventDefault();

                    this._modalWindowService.openConfirmationDialog('Confirmation', 'Are you sure? Your changes will be lost')
                        .then(() => {
                            event.targetScope.$dismiss('leave');
                        });
                }
            }
        });
    }

    save() {
        let promise = this.voucher.id ?
            this._voucherCatalogListService.editVoucher(this.voucher) :
            this._voucherCatalogListService.addVoucher(this.voucher);
        return promise.then(() => {
            if (this.onSaved) {
                this.onSaved({ result: this.voucher });
            }
        }).catch(response => {
            this._modalWindowService.openInfoDialog('Voucher was not saved', response);
        });
    }

    cancel() {
        if (this.onCanceled) {
            this.onCanceled();
        }
    }
}

export default AddVoucherController;