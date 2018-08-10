import angular from 'angular';
import addVoucherComponent from './add-voucher.component';

let addVoucherModule = angular.module('add-voucher', [])
    .component('addVoucher', addVoucherComponent);

export default addVoucherModule.name;