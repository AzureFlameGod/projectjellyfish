(function () {
  'use strict';

  angular.module('components.project-question')
    .component('projectQuestionForm', {
      templateUrl: 'components/project-question/form/form.html',
      controller: 'ProjectQuestionFormController',
      bindings: {
        projectQuestion: '<',
        onCreate: '&?',
        onUpdate: '&?',
        onDelete: '&?',
        onCancel: '&?'
      }
    });
})();
