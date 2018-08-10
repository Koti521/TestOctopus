class NavbarController {

    constructor($state, adalAuthenticationService, eventTraceService) {
        'ngInject';

        this._$state = $state;
        this._adalAuthenticationService = adalAuthenticationService;
        this._eventTraceService = eventTraceService;
    }

    login()
    {
        this._adalAuthenticationService.login();
    }

    logout()
    {
        this._eventTraceService.trace('Admin logout');
        this._adalAuthenticationService.logOut();
    }
    
    isActive(state) {
        return this._$state.is(state);
    }
}

export default NavbarController;