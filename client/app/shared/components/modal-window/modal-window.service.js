import ModalWindowTemplate from './modal-window.html';
import ModalWindowController from './modal-window.controller';

const defaultOptions = {
    showOk: true,
    textOk: 'Ok',
    showCancel: true,
    textCancel: 'Cancel'
};

class ModalWindowService {
    constructor($uibModal) {
        'ngInject';

        this._$uibModal = $uibModal;
    }

    /*
        Open information dialog with one button OK.

        modalWindowService.openInfoDialog('Info', 'Some information').then(result => { // user pressed 'OK' });
        modalWindowService.openInfoDialog('Info', templateData, 'template.html').then(result => { // user pressed 'OK' });
    */
    openInfoDialog(title, data, template) {
        let infoDialogOptions = {
            showCancel: false,
            textOk: 'Ok'
        };

        return this.open(title, data, template, infoDialogOptions);
    }

    /*
        Open confirmation dialog with buttons Yes and No.

        modalWindowService.openConfirmationDialog('Confirmation', 'Are you sure')
            .then(result => { // user pressed 'OK' }, error => { // user pressed 'Cancel' });
        modalWindowService.openConfirmationDialog('Confirmation', templateData, 'template.html')
            .then(result => { // user pressed 'OK' }, error => { // user pressed 'Cancel' });
    */
    openConfirmationDialog(title, data, template) {
        let confirmationDialogOptions = {
            textOk: 'Yes',
            textCancel: 'No'
        };

        return this.open(title, data, template, confirmationDialogOptions);
    }

    /*
        Open template without buttons.

        modalWindowService.openTemplateDialog('Some window', templateData, 'template.html')
            .then(result => { // user pressed 'OK' }, error => { // user pressed 'Cancel' });
    */
    openTemplateDialog(title, data, template) {
        let templateDialogOptions = {
            showOk: false,
            showCancel: false,
            size: 'lg'
        };

        return this.open(title, data, template, templateDialogOptions);
    }

    open(title, data, innerTemplate, options) {
        let modalOptions = Object.assign({}, defaultOptions, options);

        var modalInstance = this._$uibModal.open({
            animation: true,
            template: ModalWindowTemplate,
            controller: ModalWindowController,
            controllerAs: 'modalWindow',
            size: modalOptions.size,
            resolve: {
                modalWindowParams: function() {
                    return {
                        title: title,
                        data: data,
                        hasOnlyText: typeof data == 'string',
                        innerContent: innerTemplate,
                        options: modalOptions
                    }
                }
            }
        });

        return modalInstance.result;
    }
}

export default ModalWindowService;