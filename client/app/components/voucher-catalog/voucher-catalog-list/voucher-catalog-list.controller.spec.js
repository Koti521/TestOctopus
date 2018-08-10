import VoucherCatalogListController from './voucher-catalog-list.controller';
import VoucherCatalogListService from './voucher-catalog-list.service';
import ModalWindowService from '../../../shared/components/modal-window/modal-window.service';

describe('Voucher Catalog List Controller', () => {
    let $q, controller, voucherCatalogListService, modalWindowService;

    beforeEach(inject((_$q_) => {
        $q = _$q_;
        voucherCatalogListService = sinon.createStubInstance(VoucherCatalogListService);
        modalWindowService = sinon.createStubInstance(ModalWindowService);

        controller = new VoucherCatalogListController(voucherCatalogListService, modalWindowService);
        controller.selectedVoucher = { id: 1 };
    }));

    afterEach(() => {
        controller = voucherCatalogListService = modalWindowService = null;
    });

    it('should be defined', () => {
        expect(controller).to.be.defined;
    });

    describe('refreshVouchers', () => {
        it('should call HTTP service', (done) => {
            controller.filter = sinon.stub();
            controller.gridOptions = sinon.stub();

            voucherCatalogListService.getVoucherCatalog.returns(Promise.resolve({ vouchers: [], totalItems: 0 }));

            controller.refreshVouchers().then(() => {
                expect(voucherCatalogListService.getVoucherCatalog).to.have.been.calledOnce;
                done();
            });
        });

        it('should populate grid with response', (done) => {
            controller.filter = sinon.stub();
            controller.gridOptions = sinon.stub();

            voucherCatalogListService.getVoucherCatalog.returns(Promise.resolve({ vouchers: ['a', 'b'], totalItems: 2 }));

            controller.refreshVouchers().then(() => {
                expect(controller.gridOptions.totalItems).to.equal(2);
                expect(controller.gridOptions.data.length).to.equal(2);
                expect(controller.gridOptions.data[0]).to.equal('a');
                expect(controller.gridOptions.data[1]).to.equal('b');
                done();
            });
        });
    });

    describe('addRow', () => {
        it('should call refreshVouchers on success', (done) => {
            controller.filter = sinon.stub();
            controller.gridOptions = sinon.stub();
            controller.refreshVouchers = sinon.spy();
            modalWindowService.openTemplateDialog.returns(Promise.resolve());

            controller.addRow().then(() => {
                expect(controller.refreshVouchers).to.have.been.calledOnce;
                done();
            });
        });

        it('should call refreshVouchers on fail', (done) => {
            controller.filter = sinon.stub();
            controller.gridOptions = sinon.stub();
            controller.refreshVouchers = sinon.spy();
            modalWindowService.openTemplateDialog.returns(Promise.reject());

            controller.addRow().then(() => {
                expect(controller.refreshVouchers).to.have.been.calledOnce;
                done();
            });
        });
    });

    describe('removeRow', () => {
        it('should open confirmation dialog if row is selected', (done) => {
            modalWindowService.openConfirmationDialog.returns(Promise.resolve());
            voucherCatalogListService.deleteVoucher.returns(Promise.resolve());

            controller.removeRow().then(() => {
                expect(modalWindowService.openConfirmationDialog).to.have.been.calledOnce;
                done();
            });
        });

        it('should not open confirmation dialog if row is not selected', (done) => {
            controller.selectedVoucher = undefined;
            modalWindowService.openConfirmationDialog.returns(Promise.resolve());

            controller.removeRow();

            expect(modalWindowService.openConfirmationDialog).to.not.have.been.calledOnce;
            done();
        });

        it('should call deleteVoucher on confirm', (done) => {
            modalWindowService.openConfirmationDialog.returns(Promise.resolve());
            voucherCatalogListService.deleteVoucher.returns(Promise.resolve());

            controller.removeRow().then(() => {
                expect(voucherCatalogListService.deleteVoucher).to.have.been.calledOnce;
                done();
            });
        });

        it('should not call deleteVoucher on decline', (done) => {
            controller.selectedVoucher = {};
            modalWindowService.openConfirmationDialog.returns(Promise.reject());
            controller.removeRow().catch(() => {
                expect(voucherCatalogListService.deleteVoucher).to.not.have.been.called;
                done();
            });
        });
    });

    describe('editRow', () => {
        it('should not open confirmation dialog if row is not selected', (done) => {
            controller.selectedVoucher = undefined;
            modalWindowService.openTemplateDialog.returns(Promise.resolve());

            controller.editRow();

            expect(modalWindowService.openTemplateDialog).to.not.have.been.calledOnce;
            done();
        });

        it('should open modal window if row is selected', (done) => {
            controller.gridOptions = sinon.stub();
            modalWindowService.openTemplateDialog.returns(Promise.resolve());
            voucherCatalogListService.getVoucherCatalog.returns(Promise.resolve({ vouchers: [], totalItems: 0 }));

            controller.editRow().then(() => {
                expect(modalWindowService.openTemplateDialog).to.have.been.calledOnce;
                done();
            });
        });

        it('should call refreshVouchers on resolve', (done) => {
            controller.refreshVouchers = sinon.spy();
            controller.gridOptions = sinon.stub();
            modalWindowService.openTemplateDialog.returns(Promise.resolve());
            voucherCatalogListService.getVoucherCatalog.returns(Promise.resolve({ vouchers: [], totalItems: 0 }));

            controller.editRow().then(() => {
                expect(controller.refreshVouchers).to.have.been.calledOnce;
                done();
            });
        });
    });

    describe('$onInit', () => {
        it('should call refreshVouchers', () => {
            controller.filter = sinon.stub();
            controller.gridOptions = sinon.stub();
            controller.refreshVouchers = sinon.spy();

            controller.$onInit();

            expect(controller.refreshVouchers).to.have.been.calledOnce;
        });
    });
});