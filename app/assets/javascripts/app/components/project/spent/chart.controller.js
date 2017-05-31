(function () {
  'use strict';

  angular.module('components.project')
    .controller('ProjectSpentChartController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;

    ctrl.burnLabels = ['Remaining Budget', 'Estimated Monthly Spend', 'Spent'];

    function onChanges(changes) {
      if (changes.project) {
        ctrl.project = angular.copy(ctrl.project);

        var budget = parseInt(ctrl.project.attributes.budget, 10);
        var spent = parseInt(ctrl.project.attributes.spent, 10);
        var spending = parseInt(ctrl.project.attributes.monthly_spend, 10);
        var remaining = budget - (spending + spent);

        ctrl.burnData = [remaining, spending, spent];
      }

      ctrl.height = (ctrl.ratio || .5) * 100;
    }
  }
})();
