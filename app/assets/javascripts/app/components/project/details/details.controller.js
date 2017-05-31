(function () {
  'use strict';

  angular.module('components.project')
    .controller('ProjectDetailsController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;

    function onChanges(changes) {
      if (changes.project) {
        ctrl.project = angular.copy(ctrl.project);
      }
    }
  }
})();
