(function () {
  'use strict';

  angular.module('components.project-request')
    .component('projectRequestDetails', {
      templateUrl: 'components/project-request/details/details.html',
      bindings: {
        projectRequest: '<'
      }
    });
})();
