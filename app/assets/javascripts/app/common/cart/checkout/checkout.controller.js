(function () {
  'use strict';

  angular.module('common')
    .controller('CheckoutController', Controller);

  /** @ngInject */
  function Controller($state, CartService, ServiceRequestService, ServiceOrderService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.order = order;
    ctrl.reload = reload;
    ctrl.changePage = changePage;

    function onInit() {
      ctrl.serviceOrder = ServiceOrderService.build();
    }

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }

      if (changes.items) {
        ctrl.meta = angular.copy(ctrl.items.meta());
        ctrl.items = angular.copy(ctrl.items);
      }
    }

    function order() {
      return CartService.order()
        .then(function (order) {
          $state.go('orders.show', {id: order.id});
        });
    }

    function reload() {
      ctrl.reloading = true;

      return ServiceRequestService.search(ctrl.query)
        .then(function(results) {
          ctrl.meta = angular.copy(results.meta());
          ctrl.items = angular.copy(results);
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }

    function changePage(event) {
      $state.go('.', {page: event.page}, {notify: false});
      ctrl.query.page.number = event.page;
      reload();
    }
  }
})();
