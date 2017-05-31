(function () {
  'use strict';

  angular.module('common')
    .controller('ShowProjectController', Controller);

  /** @ngInject */
  function Controller(ProjectService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;

    function onChanges(changes) {
      if (changes.project) {
        ctrl.project = angular.copy(ctrl.project);
      }
    }

    function reload() {
      ctrl.reloading = true;

      return ProjectService.show(ctrl.project.id)
        .then(function (project) {
          ctrl.project = angular.copy(project);
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }
  }
})();
