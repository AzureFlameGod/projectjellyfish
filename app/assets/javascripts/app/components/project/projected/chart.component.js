(function () {
  'use strict';

  angular.module('components.project')
    .component('projectProjectedChart', {
      templateUrl: 'components/project/projected/chart.html',
      controller: 'ProjectProjectedChartController',
      bindings: {
        project: '<',
        months: '<?'
      }
    });
})();
