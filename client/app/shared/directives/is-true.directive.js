let _attrName = new WeakMap();

class IsTrueDirective {
    constructor() {
        this.restrict = 'A';
        this.require = 'ngModel';
        this.scope = {
            isTrue: '@'
        };
        
        _attrName = 'isTrue';
    }

    link($scope, $element, $attrs, ngModel) {
        $attrs.$observe(_attrName, (value) => {
            let isValid = $scope.$eval(value);
            ngModel.$setValidity(_attrName, isValid);
        });
    }
}

export default IsTrueDirective;