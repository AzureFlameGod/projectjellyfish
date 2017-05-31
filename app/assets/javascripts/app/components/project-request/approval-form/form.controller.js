(function () {
  'use strict';

  angular.module('components.project-request')
    .controller('ProjectApprovalFormController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.doApprove = doApprove;
    ctrl.doDeny = doDeny;

    function onChanges(changes) {
      if (changes.projectRequest) {
        ctrl.projectRequest = angular.copy(ctrl.projectRequest);
        ctrl.model = ctrl.projectRequest.attributes;
      }
    }

    function doApprove() {
      ctrl.onApprove({
        $event: {
          projectRequest: ctrl.projectRequest
        }
      });
    }

    function doDeny() {
      ctrl.onDeny({
        $event: {
          projectRequest: ctrl.projectRequest
        }
      });
    }
  }
})();
