(function () {
  'use strict';

  angular.module('common')
    .controller('ServiceApprovalModalController', Controller);

  /** @ngInject */
  function Controller(ServiceRequestService) {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.doApprove = doApprove;
    ctrl.doDeny = doDeny;

    function onChanges(changes) {
      if (changes.serviceRequest) {
        ctrl.serviceRequest = angular.copy(ctrl.serviceRequest);
        ctrl.serviceApproval = ServiceRequestService.buildApproval(ctrl.serviceRequest);
        ctrl.model = ctrl.serviceApproval.attributes;
      }
    }

    function doApprove() {
      ctrl.serviceApproval.attributes.approval = 'approve';

      return ctrl.onApprove({
        $event: {
          serviceRequest: ctrl.serviceRequest,
          serviceApproval: ctrl.serviceApproval
        }
      });
    }

    function doDeny() {
      ctrl.serviceApproval.attributes.approval = 'deny';

      return ctrl.onDeny({
        $event: {
          serviceRequest: ctrl.serviceRequest,
          serviceApproval: ctrl.serviceApproval
        }
      });
    }
  }
})();
