(function () {
  'use strict';

  angular.module('common')
    .controller('CartItemConfigureController', Controller);

  /** @ngInject */
  function Controller($window, $state, CartService) {
    var ctrl = this;

    ctrl.onUpdate = onUpdate;
    ctrl.onDelete = onDelete;
    ctrl.onCancel = onCancel;

    function onUpdate(event) {
      return CartService.configure(event.serviceRequest)
        .then(function () {
          $state.go('cart', {}, {reload: true});
        });
    }

    function onDelete(event) {
      var message = 'Delete this item from your cart?';

      if ($window.confirm(message)) {
        return CartService
          .removeFromCart(event.serviceRequest)
          .then(function () {
            $state.go('cart');
          });
      }
    }

    function onCancel() {
      $state.go('cart');
    }
  }
})();
