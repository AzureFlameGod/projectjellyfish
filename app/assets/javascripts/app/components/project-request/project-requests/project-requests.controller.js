(function () {
  'use strict';

  angular.module('components.project-request')
    .controller('ProjectRequestsController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.hasActions = hasActions;
    ctrl.doEvent = doEvent;

    function onChanges(changes) {
      if (changes.projectRequests) {
        ctrl.projectRequests = angular.copy(ctrl.projectRequests);
      }
    }

    function hasActions() {
      return ctrl.onShow || ctrl.onEdit || ctrl.onSelect || ctrl.onApprove || ctrl.onDeny;
    }

    function doEvent(event, request) {
      return ctrl['on' + event]({
        $event: {
          projectRequest: request
        }
      });
    }
  }
})();
