(function () {
  'use strict';

  angular.module('components.project-question')
    .controller('ProjectQuestionsController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.doShow = doShow;
    ctrl.hasActions = hasActions;
    ctrl.doSelect = doSelect;
    ctrl.doEdit = doEdit;
    ctrl.doDelete = doDelete;

    function onChanges(changes) {
      if (changes.projectQuestions) {
        ctrl.projectQuestions = angular.copy(ctrl.projectQuestions);
      }
    }

    function doShow(question) {
      return ctrl.onShow({
        $event: {
          projectQuestion: question
        }
      });
    }

    function hasActions() {
      return ctrl.onSelect || ctrl.onEdit || ctrl.onDelete;
    }

    function doSelect(question) {
      return ctrl.onSelect({
        $event: {
          projectQuestion: question
        }
      });
    }

    function doEdit(question) {
      return ctrl.onEdit({
        $event: {
          projectQuestion: question
        }
      });
    }

    function doDelete(question) {
      return ctrl.onDelete({
        $event: {
          projectQuestion: question
        }
      });
    }
  }
})();
