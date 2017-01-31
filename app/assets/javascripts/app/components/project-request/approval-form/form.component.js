(function () {
  'use strict';

  angular.module('components.project-request')
    .component('projectApprovalForm', {
      templateUrl: 'components/project-request/approval-form/form.html',
      controller: 'ProjectApprovalFormController',
      bindings: {
        projectRequest: '<',
        onApprove: '&?',
        onDeny: '&?',
        onCancel: '&?'
      }
    });
})();
