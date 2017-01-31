(function () {
  'use strict';

  angular.module('components.project')
    .component('projectDetails', {
      templateUrl: 'components/project/details/details.html',
      controller: 'ProjectDetailsController',
      bindings: {
        project: '<'
      }
    });
})();
