(function () {
  'use strict';

  angular.module('common')
    .controller('ShowServiceRequestController', Controller);

  /** @ngInject */
  function Controller(ServiceRequestService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;

    function onChanges(changes) {
      if (changes.serviceRequest) {
        ctrl.serviceRequest = angular.copy(ctrl.serviceRequest);
      }
    }

    function reload() {
      ctrl.reloading = true;

      return ServiceRequestService.show(ctrl.serviceRequest.id, ctrl.query)
        .then(function(response) {
          ctrl.serviceRequest = response;
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }
  }
})();
