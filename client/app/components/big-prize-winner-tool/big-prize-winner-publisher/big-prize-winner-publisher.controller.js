import PrizeWinnerValidator from './prize-winner.validator';

class bigPrizeWinnerPublisherController {

    constructor(bigPrizeWinnerPublisherService, $scope, modalWindowService) {
        'ngInject';

        this._scope = $scope;
        this._bigPrizeWinnerPublisherService = bigPrizeWinnerPublisherService;
        this._modalWindowService = modalWindowService;
    }

    $onInit() {
        this.gridOptions = {
            rowHeight: 30,
            cellEditableCondition: 'row.entity.editable',
            editableCellTemplate: 'ui-grid/cellEditor',
            enableCellSelection: true,
            enableCellEditOnFocus: true,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            enableSorting: false,
            enableFiltering: false,
            enableColumnResizing: true,
            multiSelect: false,
            columnDefs: [{
                field: 'name',
                displayName: 'Name',
                enableCellEdit: true,
                enableFiltering: true,
                enableSorting: true,
                visible: true
            }, {
                field: 'location',
                displayName: 'Location',
                enableCellEdit: true,
                enableFiltering: true,
                visible: true
            }, {
                field: 'prizeDescription',
                displayName: 'Prize',
                enableCellEdit: true,
                enableFiltering: true,
                visible: true
            }],
            onRegisterApi: function (gridApi) {
                let currentScope = this._scope;
                gridApi.selection.on.rowSelectionChanged(currentScope, row => {
                    if (row.isSelected) {
                        this._selectedRowKey = row.entity.$$hashKey;
                    } else {
                        this._selectedRowKey = undefined;
                    }
                });
            }.bind(this)
        };

        this._bigPrizeWinnerPublisherService.get.query().$promise.then(data => {
            this.gridOptions.data = data;
        });
    }

    addRow() {
        this.gridOptions.data.push({
            name: '',
            location: '',
            prizeDescription: ''
        });
    }

    removeRow() {
        let deleteElementFunc = (element) => {
            let index = this.gridOptions.data.indexOf(element);
            this.gridOptions.data.splice(index, 1);

            this._selectedRowKey = undefined;
        }

        if (this._selectedRowKey !== undefined) {
            let element = this.gridOptions.data.find(el => el.$$hashKey === this._selectedRowKey);

            if (!PrizeWinnerValidator.forInstance(element).allFieldsAreEmpty()) {
                this._modalWindowService.openConfirmationDialog(
                        'Confirmation',
                        'Are you sure you want to delete the selected row?')
                    .then(() => {
                        deleteElementFunc(element);
                    });
            }
            else {
                deleteElementFunc(element);
            }
        }
    }

    save() {
        let dataToSave = this.gridOptions.data
            .filter((row) => { return !PrizeWinnerValidator.forInstance(row).allFieldsAreEmpty(); });

        if (dataToSave.some((row) => { return !PrizeWinnerValidator.forInstance(row).allFieldsAreFilled(); })) {

            this._modalWindowService.openInfoDialog('Error', 
                'The data has not been saved due to validation issues. Please populate all empty columns with data.');
            return;
        }

        this._bigPrizeWinnerPublisherService.post.save(dataToSave).$promise.then(() => {
            this.gridOptions.data = dataToSave;
        });
    }

    hasSelectedRow() {
        return this._selectedRowKey && this._selectedRowKey.length > 0;
    }
}

export default bigPrizeWinnerPublisherController;