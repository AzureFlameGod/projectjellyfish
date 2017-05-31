(function () {
  'use strict';

  angular.module('common')
    .controller('ShowServiceController', Controller);

  /** @ngInject */
  function Controller(NotificationsService, ServiceDetailService, ServiceService) {
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
          ctrl.serviceDetail.attributes.status = result.attributes.status;
          ctrl.serviceDetail.attributes.health = result.attributes.health;
          ctrl.serviceDetail.attributes.actions = result.attributes.actions;
          ctrl.serviceDetail.attributes.details = result.attributes.details;

          NotificationsService.info("Request to '"+event.action+"' this service has been sent.", 'Action Requested');
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }
  }
})();
