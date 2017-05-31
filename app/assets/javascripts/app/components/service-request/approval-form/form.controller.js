(function () {
  'use strict';

  angular.module('components.service-request')
    .controller('ServiceApprovalFormController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.doApprove = doApprove;
    ctrl.doDeny = doDeny;

    function onChanges(changes) {
      if (changes.serviceRequest) {
        ctrl.serviceRequest = angular.copy(ctrl.serviceRequest);
        ctrl.model = ctrl.serviceRequest.attributes;
      }
    }

    function doApprove() {
      ctrl.onApprove({
        $event: {
          serviceRequest: ctrl.serviceRequest
        }
      });
    }

    function doDeny() {
      ctrl.onDeny({
        $event: {
          serviceRequest: ctrl.serviceRequest
        }
      });
    }
  }
})();
