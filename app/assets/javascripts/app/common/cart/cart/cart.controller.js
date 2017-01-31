(function () {
  'use strict';

  angular.module('common')
    .controller('CartController', Controller);

  /** @ngInject */
  function Controller($window, $state, CartService, ServiceRequestService) {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.configure = configure;
    ctrl.remove = remove;
    ctrl.changePage = changePage;

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }

      if (changes.items) {
        ctrl.meta = angular.copy(ctrl.items.meta());
        ctrl.items = angular.copy(ctrl.items);
      }
    }

    function configure(event) {
      $state.go('cart.configure', {id: event.serviceRequest.id});
    }

    function remove(event) {
      var serviceRequest = event.serviceRequest;
      var name = serviceRequest.attributes.product().attributes.name;

      if ($window.confirm('Remove ' + name + ' from your cart?')) {
        CartService.removeFromCart(event.serviceRequest)
          .then(function () {
            reload();
          });
      }
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
