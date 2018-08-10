class BigPrizeWinnerListController {

    constructor(bigPrizeWinnerListService) {
        'ngInject';

        this._bigPrizeWinnerListService = bigPrizeWinnerListService;
        this.dateFormat = 'dd/MM/yyyy';
    }

    $onInit() {
        this.gridOptions = {
            enableFiltering: false,
            enableSorting: false,
            enableColumnResizing: true,
            columnDefs: [{
                field: 'firstName',
                displayName: 'First name',
                visible: true
            }, {
                field: 'lastName',
                displayName: 'Surname',
                visible: true
            }, {
                field: 'address1',
                displayName: 'Address Line 1',
                visible: true
            }, {
                field: 'address2',
                displayName: 'Address Line 2',
                visible: true
            }, {
                field: 'address3',
                displayName: 'Address Line 3',
                visible: true
            }, {
                field: 'address4',
                displayName: 'Address Line 4',
                visible: true
            }, {
                field: 'postCode',
                displayName: 'PostCode',
                visible: true
            }, {
                field: 'transactionReason',
                displayName: 'Transaction Reason',
                visible: true
            }, {
                field: 'transactionDescription',
                displayName: 'Transaction Description',
                visible: true
            }, {
                field: 'transactionValue',
                displayName: 'Transaction Value',
                visible: true
            }]
        };

        this._bigPrizeWinnerListService.getWinnerData().then((data) => {
            this.gridOptions.data = data.winners;
            this.issuedFrom = data.issuedFrom;
            this.issuedTo = data.issuedTo;
        });
    }
}

export default BigPrizeWinnerListController;