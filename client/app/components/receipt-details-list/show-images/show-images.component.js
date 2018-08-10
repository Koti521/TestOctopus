import './show-images.less';
import template from './show-images.html';
import controller from './show-images.controller';

const showImagesComponent = {
    template,
    controller,
    controllerAs: 'vm',
    bindings: {
        receiptId: '<'
    }
};

export default showImagesComponent;