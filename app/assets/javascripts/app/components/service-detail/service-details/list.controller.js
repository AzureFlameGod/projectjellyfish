(function () {
  'use strict';

  angular.module('components.service')
    .controller('ServiceDetailsController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.hasActions = hasActions;
    ctrl.doEvent = doEvent;

    function onChanges(changes) {
      if (changes.serviceDetails) {
        ctrl.serviceDetails = angular.copy(ctrl.serviceDetails);
      }
    }

    function hasActions() {
      return ctrl.onShow || ctrl.onSelect || ctrl.onUpdate || ctrl.onDelete;
    }

    function doEvent(event, service) {
      return ctrl['on'+event]({
        $event: {
          serviceDetail: service
        }
      });
    }
  }
})();
