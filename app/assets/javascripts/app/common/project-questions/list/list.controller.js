(function () {
  'use strict';

  angular.module('common')
    .controller('ProjectQuestionsListController', Controller);

  /** @ngInject */
  function Controller($window, $state, ProjectQuestionService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;
    ctrl.changePage = changePage;
    ctrl.onShow = onShow;
    ctrl.onEdit = onEdit;
    ctrl.onDelete = onDelete;

    function onChanges(changes) {
      if (changes.projectQuestions) {
        ctrl.meta = angular.copy(ctrl.projectQuestions.meta());
        ctrl.projectQuestions = angular.copy(ctrl.projectQuestions);
      }
    }

    function reload() {
      ctrl.reloading = true;

      return ProjectQuestionService.search(ctrl.query)
        .then(function(response) {
          ctrl.meta = angular.copy(response.meta());
          ctrl.projectQuestions = angular.copy(response);
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }

    function changePage(event) {
      $state.go('.', {page: event.page}, {notify: false});
      ctrl.query.page.number = event.page;
      reload();
    }

    function onShow(event) {
      $state.go('project-questions.show', {id: event.projectQuestion.id});
    }

    function onEdit(event) {
      $state.go('project-questions.edit', {id: event.projectQuestion.id});
    }

    function onDelete(event) {
      var message = 'Delete the question `' + event.projectQuestion.attributes.label +'` from the system?';

      if ($window.confirm(message)) {
        ProjectQuestionService.destroy(event.projectQuestion)
          .then(function () {
            reload();
          });
      }
    }
  }
})();
