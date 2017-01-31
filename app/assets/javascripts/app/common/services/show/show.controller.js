(function () {
  'use strict';

  angular.module('common')
    .controller('ShowServiceController', Controller);

  /** @ngInject */
  function Controller(ServiceDetailService, ServiceService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;

    ctrl.onAction = onAction;

    function onChanges(changes) {
      if (changes.serviceDetail) {
        ctrl.serviceDetail = angular.copy(ctrl.serviceDetail);
      }
    }

    function reload() {
      ctrl.reloading = true;

      return ServiceDetailService.show(ctrl.serviceDetail.id, ctrl.query)
        .then(function (result) {
          ctrl.serviceDetail = angular.copy(result);
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }

    function onAction(event) {
      var data = ServiceService.buildAction(ctrl.serviceDetail, event.action);

      ctrl.reloading = true;

      return ServiceService.action(ctrl.serviceDetail.id, data)
        .then(function (result) {
          // Update status, health, actions, details, ...
          ctrl.serviceDetails.attributes.status = result.attributes.status;
          ctrl.serviceDetails.attributes.health = result.attributes.health;
          ctrl.serviceDetails.attributes.actions = result.attributes.actions;
          ctrl.serviceDetails.attributes.details = result.attributes.details;
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }
  }
})();
