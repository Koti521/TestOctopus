import AddVoucherController from './add-voucher.controller';
import VoucherCatalogListService from '../voucher-catalog-list.service';
import ModalWindowService from '../../../../shared/components/modal-window/modal-window.service';

describe('Add Voucher Controller', () => {
    let scope, controller, voucherCatalogListService, modalWindowService;

    beforeEach(inject($rootScope => {
        scope = $rootScope.$new();

        voucherCatalogListService = sinon.createStubInstance(VoucherCatalogListService);
        modalWindowService = sinon.createStubInstance(ModalWindowService);

        controller = new AddVoucherController(voucherCatalogListService, modalWindowService, scope);
        controller.$onInit();
    }));

    afterEach(() => {
        controller = voucherCatalogListService = modalWindowService = scope = null;
    });

    it('should be defined', () => {
        expect(controller).to.be.defined;
    });

    describe('save added voucher', () => {
        it('should show popup if fail', (done) => {
            voucherCatalogListService.addVoucher.returns(Promise.reject());

            controller.save().then(() => {
                expect(modalWindowService.openInfoDialog).to.have.been.calledOnce;
                done();
            });
        });

        it('should call callback function if defined if success', (done) => {
            controller.onSaved = sinon.spy();
            controller.voucher = {
                name: 'text'
            }

            voucherCatalogListService.addVoucher.returns(Promise.resolve());

            controller.save().then(() => {
                expect(controller.onSaved).to.have.been.calledOnce.and.calledWith({ result: controller.voucher });
                done();
            });
        });
    });

    describe('save updated voucher', () => {
        it('should show popup if fail', (done) => {
            voucherCatalogListService.editVoucher.returns(Promise.reject());
            controller.voucher = {
                id: '111'
            }

            controller.save().then(() => {
                expect(modalWindowService.openInfoDialog).to.have.been.calledOnce;
                done();
            });
        });

        it('should call callback function if defined if success', (done) => {
            controller.onSaved = sinon.spy();
            controller.voucher = {
                id: '111'
            }
            voucherCatalogListService.editVoucher.returns(Promise.resolve());

            controller.save().then(() => {
                expect(controller.onSaved).to.have.been.calledOnce.and.calledWith({ result: controller.voucher });
                done();
            });
        });
    });

    describe('cancel', () => {
        it('should call callback function if defined', () => {
            controller.onCanceled = sinon.spy();

            controller.cancel();

            expect(controller.onCanceled).to.have.been.calledOnce;
        });
    });
});