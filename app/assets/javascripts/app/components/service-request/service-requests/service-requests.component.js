(function () {
  'use strict';

  angular.module('components.service-request')
    .component('serviceRequests', {
      templateUrl: 'components/service-request/service-requests/service-requests.html',
      controller: 'ServiceRequestsController',
      bindings: {
        serviceRequests: '<',
        onShow: '&?',
        onEdit: '&?',
        onSelect: '&?',
        onApprove: '&?',
        onDeny: '&?'
      }
    });
})();
