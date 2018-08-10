import angular from 'angular';
import showImagesComponent from './show-images.component';
import showImagesService from './show-images.service';
import showImagesResource from './show-images.resource';

let showImagesModule = angular.module('show-images', [])
    .component('showImages', showImagesComponent)
    .service('showImagesService', showImagesService)
    .factory('showImagesResource', showImagesResource);

export default showImagesModule.name;