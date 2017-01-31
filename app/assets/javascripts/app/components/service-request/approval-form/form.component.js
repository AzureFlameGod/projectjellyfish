(function () {
  'use strict';

  angular.module('components.service-request')
    .component('serviceApprovalForm', {
      templateUrl: 'components/service-request/approval-form/form.html',
      controller: 'ServiceApprovalFormController',
      bindings: {
        serviceRequest: '<',
        onApprove: '&?',
        onDeny: '&?',
        onCancel: '&?'
      }
    });
})();
