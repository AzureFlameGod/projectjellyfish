(function () {
  'use strict';

  angular.module('components.project')
    .component('projectBudgetDetails', {
      templateUrl: 'components/project/budget-details/details.html',
      controller: 'ProjectBudgetDetailsController',
      bindings: {
        project: '<'
      }
    });
})();
