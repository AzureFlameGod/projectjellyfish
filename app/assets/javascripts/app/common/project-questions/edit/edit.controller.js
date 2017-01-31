(function () {
  'use strict';

  angular.module('common')
    .controller('ProjectQuestionEditController', Controller);

  /** @ngInject */
  function Controller($window, $state, ProjectQuestionService) {
    var ctrl = this;

    ctrl.$onChanges = onChanges;

    ctrl.onUpdate = onUpdate;
    ctrl.onDelete = onDelete;
    ctrl.onCancel = onCancel;

    function onChanges(changes) {
      if (changes.projectQuestion) {
        ctrl.projectQuestion = angular.copy(ctrl.projectQuestion);
      }
    }

    function onUpdate(event) {
      return ProjectQuestionService.update(event.projectQuestion)
        .then(function() {
          $state.go('project-questions.list')
        });
    }

    function onDelete(event) {
      var message = 'Delete the question "'+ ctrl.projectQuestion.attributes.label +'" from the database?';

      if ($window.confirm(message)) {
        return ProjectQuestionService.delete(event.projectQuestion)
          .then(function () {
            $state.go('project-questions.list');
          });
      }
    }

    function onCancel() {
      $state.go('project-questions.list');
    }
  }
})();
