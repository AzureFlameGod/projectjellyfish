(function () {
  'use strict';

  angular.module('components.project')
    .controller('ProjectProjectedChartController', Controller);

  /** @ngInject */
  function Controller(moment) {
    var ctrl = this;

    ctrl.options = [
      [3, 'Next Quarter'],
      [4, 'Next four months'],
      [6, 'Next six months'],
      [12, 'Next year']
    ];

    ctrl.series = ['Budget', 'Spent'];
    ctrl.labels = [];

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;

    ctrl.regenerate = regenerate;

    function onInit() {
      ctrl.months = ctrl.months || '12';
    }

    function onChanges(changes) {
      if (changes.project) {
        ctrl.project = angular.copy(ctrl.project);
      }
      regenerate();
    }

    function regenerate() {
      ctrl.labels = generateLabels(ctrl.months);
      ctrl.data = generateData(
        parseInt(ctrl.months, 10),
        parseInt(ctrl.project.attributes.budget, 10),
        parseInt(ctrl.project.attributes.spent, 10),
        parseInt(ctrl.project.attributes.monthly_spend, 10)
      );
    }

    function generateLabels(totalMonths) {
      var currentMonth = moment().month();
      var months = [];

      for (var i = 0; i < totalMonths; i++) {
        months.push(moment().month(currentMonth + i).format('MMM'));
      }

      return months;
    }

    function generateData(totalMonths, budget, spent, spend) {
      var data = [[], []];

      for (var i = 0; i < totalMonths; i++) {
        data[0][i] = budget;
        data[1][i] = spent + spend * i;
      }

      return data;
    }
  }
})();
