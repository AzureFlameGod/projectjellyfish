(function () {
  'use strict';

  angular.module('components.dashboard')
    .controller('ProjectsProjectedWidget', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.project = null;

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;

    function onInit() {
      if (ctrl.projects.length === 0) {
        return;
      }

      ctrl.project = ctrl.projects[0];
    }

    function onChanges(changes) {
      if (changes.projects) {
        ctrl.projects = angular.copy(ctrl.projects);
      }
    }
  }
})();
