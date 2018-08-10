class ShowImagesController {
    constructor(showImagesService) {
        'ngInject';

        this._showImagesService = showImagesService;
    }

    $onInit() {
        this._showImagesService.getImages(this.receiptId).then(result => {
            this.images = result
        });
    }
}

export default ShowImagesController;