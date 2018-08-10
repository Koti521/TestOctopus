import VoucherCatalogListService from './voucher-catalog-list.service';

describe('Voucher Catalog List Service', () => {
    let sut, _$q, _$rootScope, _$defer, eventTraceService, voucherCatalogResource, log;

    beforeEach(inject(($q, $rootScope) => {
        _$q = $q;
        _$rootScope = $rootScope;

        _$defer = _$q.defer();
        _$q.defer = sinon.stub();
        _$q.defer.returns(_$defer);

        voucherCatalogResource = { query: sinon.stub(), add: sinon.stub() };
        log = { error: sinon.stub() };
        eventTraceService = { trace: sinon.stub() };

        sut = new VoucherCatalogListService(voucherCatalogResource, eventTraceService, log, $q);
    }));

    afterEach(() => {
        sut = eventTraceService = voucherCatalogResource = log = _$defer = _$rootScope = _$q = null;
    });

    it('should be defined', () => {
        expect(sut).to.be.defined;
    });

    describe('addVoucher', () => {
        it('throw error if no vouscher provided', () => {
            expect(() => { sut.addVoucher(); }).to.throw(Error);
        });

        it('should return response', (done) => {
            let response = { name: 'test' };

            voucherCatalogResource.add.returns({$promise: Promise.resolve(response)});
            _$defer.resolve(response);

            sut.addVoucher({}).then(response => {
                expect(response).to.equal(response);

                done();
            });
            
            _$rootScope.$apply();
        });
    });

    describe('getVoucherCatalog', () => {
        it('throw error if pageNumber less than 1', () => {
            expect(() => { sut.getVoucherCatalog(); }).to.throw(Error);
        });

        it('should call get resource with appropriate query', (done) => {
            let response = [];

            voucherCatalogResource.query.returns({$promise: Promise.resolve(response)});

            sut.getVoucherCatalog({pageNumber: 5, pageSize: 10}).then(response => {
                expect(voucherCatalogResource.query).to.have.been.calledOnce.calledWith({ offset: 40, numberOfItems: 10 });

                done();
            });
        });

        it('should log error in case of failure', (done) => {
            voucherCatalogResource.query.returns({ $promise: Promise.reject() });
            
            sut.getVoucherCatalog({pageNumber: 5, pageSize: 10}).catch(() => {
                expect(log.error).to.have.been.calledOnce;

                done();
            });
        });
    });  
 });