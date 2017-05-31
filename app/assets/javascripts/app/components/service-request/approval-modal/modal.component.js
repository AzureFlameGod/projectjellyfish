(function () {
  'use strict';

  angular.module('components.service-request')
    .component('serviceApprovalModal', {
      templateUrl: 'components/service-request/approval-modal/modal.html',
      controller: 'ServiceApprovalModalController',
      bindings: {
        query: '<',
        serviceRequest: '<',
        onApprove: '&?',
        onDeny: '&?',
        onCancel: '&?'
      }
    });
})();
