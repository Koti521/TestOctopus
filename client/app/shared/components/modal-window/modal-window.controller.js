export default class ModalWindowController {
    constructor($uibModalInstance, modalWindowParams) {
        'ngInject';

        this._$uibModalInstance = $uibModalInstance;
        this._modalWindowParams = modalWindowParams
    }

    $onInit() {
        this.params = this._modalWindowParams;
        Object.assign(this, this._modalWindowParams.data);
    }

    ok(result) {
        this._$uibModalInstance.close(result);
    }

    cancel() {
        this._$uibModalInstance.dismiss('cancel');
    }
}