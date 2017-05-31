(function () {
  'use strict';

  angular.module('components.service-order')
    .controller('ServiceOrdersController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.sortBy = 'name';
    ctrl.sortDir = 1;

    ctrl.$onChanges = onChanges;
    ctrl.selectOrder = selectOrder;
    ctrl.sort = sort;

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

    function sort(event) {
      if (event.sortBy !== ctrl.sortBy) {
        event.sortDir = 1;
      }

      angular.merge(ctrl, event);

      if (angular.isDefined(ctrl.onSort)) {
        ctrl.onSort({ $event: event });
      }
    }
  }
})();
