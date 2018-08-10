class FileService {
    constructor(FileSaver) {
        'ngInject';

        this._fileSaver = FileSaver;
    }

    saveFile(byteArray, blobType, fileName) {
        let blob = new Blob(byteArray, { type: blobType});
        this._fileSaver.saveAs(blob, fileName);
    }
}

export default FileService;