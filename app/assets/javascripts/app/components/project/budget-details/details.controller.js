(function () {
  'use strict';

  angular.module('components.project')
    .controller('ProjectBudgetDetailsController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;

    function onChanges(changes) {
      if (changes.project) {
        ctrl.project = angular.copy(ctrl.project);

        ctrl.overSpent = Math.max(0, ctrl.project.attributes.spent - ctrl.project.attributes.budget);
        ctrl.remaining = Math.max(0, ctrl.project.attributes.budget - ctrl.project.attributes.spent);
        ctrl.projected = computeProjected();
      }
    }

    function computeProjected() {
      var months = 0;

      if (parseInt(ctrl.project.attributes.monthly_spend, 10) === 0) {
        months = 100;
      } else {
        months = ctrl.remaining / parseInt(ctrl.project.attributes.monthly_spend, 10);
      }

      if (months > 99) {
        return '99+';
      }

      return Math.round(months, 1);
    }
  }
})();
