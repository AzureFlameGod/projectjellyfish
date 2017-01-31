(function () {
  'use strict';

  angular.module('components.project-question')
    .component('projectQuestions', {
      templateUrl: 'components/project-question/project-questions/project-questions.html',
      controller: 'ProjectQuestionsController',
      bindings: {
        projectQuestions: '<',
        onShow: '&?',
        onSelect: '&?',
        onEdit: '&?',
        onDelete: '&?'
      }
    });
})();
