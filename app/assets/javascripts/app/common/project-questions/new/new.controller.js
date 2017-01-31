(function () {
  'use strict';

  angular.module('common')
    .controller('ProjectQuestionNewController', Controller);

  /** @ngInject */
  function Controller($state, ProjectQuestionService) {
    var ctrl = this;

    ctrl.$onChanges = onChanges;

    ctrl.onCreate = onCreate;
    ctrl.onCancel = onCancel;

    function onChanges(changes) {
      if (changes.projectQuestion) {
        ctrl.projectQuestion = angular.copy(ctrl.projectQuestion);
      }
    }

    function onCreate(event) {
      return ProjectQuestionService.create(event.projectQuestion)
        .then(function (projectQuestion) {
          $state.go('project-questions.edit', {id: projectQuestion.id});
        });
    }

    function onCancel() {
      $state.go('project-questions.list');
    }
  }
})();
