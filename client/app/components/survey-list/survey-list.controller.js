import rowTemplate from './survey-list-row-template.html';

class SurveyListController {

    constructor(surveyListService, modalWindowService, queryStringService, surveyStatus, gridOptions) {
        'ngInject';

        this._surveyListService = surveyListService;
        this._modalWindowService = modalWindowService;
        this._queryStringService = queryStringService;
        this._surveyStatus = surveyStatus;
        this._gridOptions = gridOptions;
    }

    $onInit() {
        this.selectedSurvey = undefined;
        this.isNullOrEmpty = function(value) {
            let isNullOrEmptyFlag = true;
            if (value && typeof (value) == 'string' && value.length > 0) {
                isNullOrEmptyFlag = false;
            }

            return isNullOrEmptyFlag;
        };
        this.isSearchActivated = false;
        this.surveyInAppName = '';
        this.surveyInternalName = '';


        let filterFromQueryString = this._queryStringService.getQuery();
        this.filter = {
            pageNumber: parseInt(filterFromQueryString.pageNumber) || this._gridOptions.defaultPageNumber,
            pageSize: this._gridOptions.availablePageSizes.includes(parseInt(filterFromQueryString.pageSize)) 
                ? parseInt(filterFromQueryString.pageSize) 
                : this._gridOptions.defaultPageSize,
            sort: filterFromQueryString.sort || null,
            direction: this._gridOptions.availableSortDirection.includes(filterFromQueryString.direction)
                ? filterFromQueryString.direction
                : this._gridOptions.defaultSortDirection,
            surveyInAppName: '',
            surveyInternalName: ''
        };

        this.gridOptions = {
            enableColumnResizing: true,
            paginationPageSizes: this._gridOptions.availablePageSizes,
            paginationPageSize: this.filter.pageSize,
            paginationCurrentPage: this.filter.pageNumber,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            useExternalPagination: true,
            useExternalSorting: true,
            multiSelect: false,
            enableHorizontalScrollbar: 0,
            virtualizationThreshold: 100,
            data: [],
            rowTemplate: rowTemplate,
            columnDefs: [{
                field: 'dateCreated',
                displayName: 'Date Created',
                enableSorting: true,
                cellFilter: 'date:\'yyyy-MM-dd\'',
                sort: {
                    direction: this._gridOptions.defaultSortDirection
                },
                sortDirectionCycle: this._gridOptions.availableSortDirection,
                minWidth: 30,
                width: '*',
                visible: true
            }, {
                field: 'questbackSurveyId',
                displayName: 'Questback Survey ID',
                enableSorting: false,
                width: '*',
                visible: true
            }, {
                field: 'surveyInAppName',
                displayName: 'Survey In App Name',
                enableSorting: true,
                sortDirectionCycle: this._gridOptions.availableSortDirection,
                minWidth: 60,
                width: '12%',
                visible: true
            }, {
                field: 'surveyInternalName',
                displayName: 'Survey Internal Name',
                enableSorting: true,
                sortDirectionCycle: this._gridOptions.availableSortDirection,
                minWidth: 60,
                width: '12%',
                visible: true
            }, {
                field: 'token',
                displayName: 'Tokens',
                enableSorting: false,
                width: '9%',
                visible: true
            }, {
                field: 'surveyExpiryDateTime',
                displayName: 'Expiry Date/Time',
                enableSorting: true,
                sortDirectionCycle: this._gridOptions.availableSortDirection,
                cellFilter: 'date:\'yyyy-MM-dd HH:mm\'',
                width: '11%',
                visible: true
            }, {
                field: 'surveyDurationDays',
                displayName: 'Survey Days',
                enableSorting: false,
                minWidth: 60,
                visible: true
            }, {
                field: 'surveyDurationHours',
                displayName: 'Survey Hours',
                enableSorting: false,
                minWidth: 60,
                visible: true
            }, {
                field: 'surveyTime',
                displayName: 'Survey Time (Minutes)',
                enableSorting: false,
                minWidth: 60,
                visible: true
            }, {
                field: 'surveyLaunchDate',
                displayName: 'Survey Launch Date',
                enableSorting: true,
                sortDirectionCycle: this._gridOptions.availableSortDirection,
                cellFilter: 'date:\'yyyy-MM-dd HH:mm\'',
                width: '11%',
                visible: true
            }, {
                field: 'userCount',
                displayName: 'User Count',
                enableSorting: false,
                minWidth: 50,
                width: '5%',
                visible: true
            }, {
                field: 'allowNotification',
                displayName: 'Notification',
                enableSorting: false,
                cellFilter: 'yesNo', // shared/filters/yesNo.filter.js
                maxWidth: 80,
                width: '8%',
                visible: true
            }, {
                field: 'status',
                displayName: 'Status',
                cellFilter: 'wordify:\'upper\'',
                enableSorting: true,
                sortDirectionCycle: this._gridOptions.availableSortDirection,
                minWidth: 20,
                width: '*',
                visible: true
            }],
            onRegisterApi: (gridApi) => {
                gridApi.core.on.sortChanged(null, (grid, sortColumns) => {
                    if (sortColumns.length > 0) {
                        this.filter.sort = sortColumns[0].field;
                        this.filter.direction = sortColumns[0].sort.direction;
                    } else {
                        this.filter.sort = null;
                        this.filter.direction = null;
                    }
                    this.refreshSurveys();
                });
                gridApi.pagination.on.paginationChanged(null, (newPage, pageSize) => {
                    this.filter.pageNumber = newPage;
                    this.filter.pageSize = pageSize;
                    this.refreshSurveys();
                });
                gridApi.selection.on.rowSelectionChanged(null, row => {
                    if (row.isSelected) {
                        this.selectedSurvey = row.entity;
                    } else {
                        this.selectedSurvey = undefined;
                    }
                });
            }
        };

        this.refreshSurveys();
    }

    refreshSurveys() {
        let promise = this._surveyListService.getList(this.filter).then(result => {
            this.gridOptions.data = result.surveys;
            this.gridOptions.totalItems = result.totalItems;
        }).then(() => {
            // setup query string with updated filter
            this._queryStringService.setQuery(this.filter);
        });

        return promise;
    }

    addSurvey() {
        this._modalWindowService.openTemplateDialog('Add survey', undefined, 'add-survey-template.html')
            .then(() => { return this.refreshSurveys(); })
            .catch(() => { return this.refreshSurveys(); });
    }

    editSurvey() {
        let callbackInAnyCase = () => {
            this._resetSelectedRow();
            return this.refreshSurveys();
        };

        this._modalWindowService.openTemplateDialog('Edit survey', { surveyId: this.selectedSurvey.id }, 'edit-survey-template.html')
            .then(callbackInAnyCase)
            .catch(callbackInAnyCase);
    }

    editSurveyDisable() {
        return this.selectedSurvey === undefined 
            || this.selectedSurvey.status === this._surveyStatus.deactivated;
    }

    launchSurvey() {
        this._surveyListService.launchSurvey(this.selectedSurvey.id).then(result => {
            this._resetSelectedRow();
            this._modalWindowService.openInfoDialog('Launch survey', angular.fromJson(result.data).message);
            this.refreshSurveys();
        }).catch((response) => {
            let errorMessage = response.status === 400 && response.data && response.data.description 
                ? response.data.description 
                : undefined;

            this._modalWindowService.openInfoDialog('Launch survey', `Survey was not lauhched. ${errorMessage}`);
        });
    }

    launchSurveyDisable() {
        let entity = this.selectedSurvey;
        return entity === undefined ||
            this.isNullOrEmpty(entity.surveyInAppName) ||
            this.isNullOrEmpty(entity.surveyInternalName) ||
            this.isNullOrEmpty(entity.token) ||
            this.isNullOrEmpty(entity.surveyTime) ||
            entity.status === 'Deactivated' || entity.status === 'Launched' ||
            entity.surveyExpiryDateTime === null || Date.parse(entity.surveyExpiryDateTime) < Date.parse(new Date().toISOString());
    }

    refreshSurveyUsers(){
        let initialStatus = this.selectedSurvey.status;
        this.selectedSurvey.status = 'UserListRefreshing';
        this._surveyListService.refreshSurveyUsers(this.selectedSurvey.id).catch(() => {
            this.selectedSurvey.status = initialStatus;
            this._resetSelectedRow();
            this._modalWindowService.openInfoDialog('Refresh Users', 'Users list has not been refreshed');
        });
    }

    refreshSurveyUsersDisable() {
        let entity = this.selectedSurvey;
        return entity === undefined ||
            entity.status == 'Deactivated' || entity.status == 'UserListRefreshing';
    }

    deactivateSurvey() {
        return this._modalWindowService.open('Confirmation', 'Are you sure you want to deactivate the survey?')
            .then(() => this._surveyListService.deactivateSurvey(this.selectedSurvey.id))
            .then(() => this._resetSelectedRow())
            .then(() => this.refreshSurveys());
    }

    deactivateSurveyDisable() {
        let entity = this.selectedSurvey;
        return entity === undefined 
            || entity.status === this._surveyStatus.deactivated
            || entity.status === this._surveyStatus.launched;
    }

    showSearchBar() {
        this.isSearchActivated = !this.isSearchActivated;
    }

    searchSurvey(){
        // Create request to backend to retrieve surveys by passed conditions
        this.filter.surveyInAppName = this.surveyInAppName;
        this.filter.surveyInternalName = this.surveyInternalName;
        this.refreshSurveys();
    }

    _resetSelectedRow() {
        this.selectedSurvey = undefined; 
    }
}

export default SurveyListController;
