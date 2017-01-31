(function () {
  'use strict';

  angular.module('components.project-request')
    .component('projectApprovalModal', {
      templateUrl: 'components/project-request/approval-modal/modal.html',
      controller: 'ProjectApprovalModalController',
      bindings: {
        query: '<',
        projectRequest: '<',
        onApprove: '&?',
        onDeny: '&?',
        onCancel: '&?'
      }
    });
})();
