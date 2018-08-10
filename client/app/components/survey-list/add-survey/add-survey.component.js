import './add-survey.less';
import template from './add-survey.html';
import controller from './add-survey.controller';

const addSurveyComponent = {
    template,
    controller,
    controllerAs: 'vm',
    bindings: {
        onSaved: '&',
        onCanceled: '&'
    }
};

export default addSurveyComponent;