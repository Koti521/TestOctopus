const surveyStatus = {
    created: 'Created',
    updated: 'Updated',
    userListRefreshed: 'UsersListRefreshed',
    launched: 'Launched',
    deactivated: 'Deactivated',
    userListRefreshing: 'UserListRefreshing',
    completed: 'Completed'
};

const gridOptions = {
    availablePageSizes: [25, 50, 75, 100],
    availableSortDirection: ['asc', 'desc'],
    defaultSortDirection: 'desc',
    defaultPageSize: 25,
    defaultPageNumber: 1
};

export { surveyStatus, gridOptions };