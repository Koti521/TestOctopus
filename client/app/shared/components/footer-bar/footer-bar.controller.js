class FooterBarController {
    constructor() {
        'njInject';
    }

    $onInit() {
        this.currentYear = new Date().getUTCFullYear();
    }
}

export default FooterBarController;