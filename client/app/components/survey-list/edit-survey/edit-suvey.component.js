import template from './edit-survey.html';
import controller from './edit-survey.controller';

let editSuveyComponent = {
    template,
    controller,
    controllerAs: 'vm',
    bindings: {
        surveyId: '<',
        onSaved: '&',
        onCanceled: '&'
    }
};

export default editSuveyComponent;