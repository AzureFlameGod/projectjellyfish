(function () {
  'use strict';

  angular.module('components.project')
    .component('projectSpentChart', {
      templateUrl: 'components/project/spent/chart.html',
      controller: 'ProjectSpentChartController',
      bindings: {
        project: '<',
        ratio: '<?'
      }
    });
})();
