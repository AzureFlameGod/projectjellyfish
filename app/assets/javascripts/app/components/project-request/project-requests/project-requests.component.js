(function () {
  'use strict';

  angular.module('components.project-request')
    .component('projectRequests', {
      templateUrl: 'components/project-request/project-requests/project-requests.html',
      controller: 'ProjectRequestsController',
      bindings: {
        projectRequests: '<',
        onShow: '&?',
        onEdit: '&?',
        onSelect: '&?',
        onApprove: '&?',
        onDeny: '&?'
      }
    });
})();
