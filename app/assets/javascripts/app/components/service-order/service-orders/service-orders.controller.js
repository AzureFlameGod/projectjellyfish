(function () {
  'use strict';

  angular.module('components.service-order')
    .controller('ServiceOrdersController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.selectOrder = selectOrder;

    function onChanges(changes) {
      if (changes.serviceOrders) {
        ctrl.serviceOrders = angular.copy(ctrl.serviceOrders);
      }
    }

    function selectOrder(order) {
      return ctrl.onShow({
        $event: {
          serviceOrder: order
        }
      });
    }
  }
})();
