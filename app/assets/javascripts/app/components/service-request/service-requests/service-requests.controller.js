(function () {
  'use strict';

  angular.module('components.service-request')
    .controller('ServiceRequestsController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.hasActions = hasActions;
    ctrl.doEvent = doEvent;

    function onChanges(changes) {
      if (changes.serviceRequests) {
        ctrl.serviceRequests = angular.copy(ctrl.serviceRequests);
      }
    }

    function hasActions() {
      return ctrl.onSelect || ctrl.onShow || ctrl.onEdit || ctrl.onApprove || ctrl.onDeny;
    }

    function doEvent(event, request) {
      return ctrl['on' + event]({
        $event: {
          serviceRequest: request
        }
      });
    }
  }
})();
