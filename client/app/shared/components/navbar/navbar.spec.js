import navbarModule from './navbar.module';
import navbarController from './navbar.controller';
import navbarComponent from './navbar.component';
import navbarTemplate from './navbar.html';

describe('Navbar', () => {

    beforeEach(window.module(navbarModule));

    describe('Controller', () => {
        let controller;
        let $scope, $state;

        beforeEach(inject((_$rootScope_, _$state_) => {
            $scope = _$rootScope_.$new();
            $state = _$state_;

            controller = new navbarController($state);
        }));

        it('isActive should recognize that specified state is current', () => {
            sinon.stub($state, "is").returns(true);

            let result = controller.isActive('State1');

            expect(result).to.be.true;
        });

        it('isActive should call $state service with correct params', () => {
            sinon.stub($state, "is");

            controller.isActive('State1');

            expect($state.is).to.have.been.calledWith('State1');
        });
    });

    describe('Component', () => {
        let component = navbarComponent;

        it('includes the intended template', () => {
            expect(component.template).to.equal(navbarTemplate);
        });

        it('invokes the right controller', () => {
            expect(component.controller).to.equal(navbarController);
        });
    });
});