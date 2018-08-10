import angular from 'angular';
import 'angular-file-upload/dist/angular-file-upload.js';

import ExtendedFileUploader  from './ExtendedFileUploader';

let fileUploaderModule = angular.module('file-uploader', [
    'angularFileUpload'
])
    .factory('ExtendedFileUploader', ExtendedFileUploader)

export default fileUploaderModule.name;