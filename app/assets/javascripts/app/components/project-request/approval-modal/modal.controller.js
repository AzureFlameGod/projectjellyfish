(function () {
  'use strict';

  angular.module('common')
    .controller('ProjectApprovalModalController', Controller);

  /** @ngInject */
  function Controller(ProjectRequestService) {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.doApprove = doApprove;
    ctrl.doDeny = doDeny;

    function onChanges(changes) {
      if (changes.projectRequest) {
        ctrl.projectRequest = angular.copy(ctrl.projectRequest);
        ctrl.projectApproval = ProjectRequestService.buildApproval(ctrl.projectRequest);
        ctrl.model = ctrl.projectApproval.attributes;
      }
    }

    function doApprove() {
      ctrl.projectApproval.attributes.approval = 'approve';

      return ctrl.onApprove({
        $event: {
          projectRequest: ctrl.projectRequest,
          projectApproval: ctrl.projectApproval
        }
      });
    }

    function doDeny() {
      ctrl.projectApproval.attributes.approval = 'deny';

      return ctrl.onDeny({
        $event: {
          projectRequest: ctrl.projectRequest,
          projectApproval: ctrl.projectApproval
        }
      });
    }
  }
})();
