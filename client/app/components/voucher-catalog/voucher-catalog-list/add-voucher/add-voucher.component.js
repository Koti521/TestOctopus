import './add-voucher.less';
import template from './add-voucher.html';
import controller from './add-voucher.controller';

const addVoucherComponent = {
    template,
    controller,
    controllerAs: 'vm',
    bindings: {
        voucher: '<',
        onSaved: '&',
        onCanceled: '&'
    }
};

export default addVoucherComponent;