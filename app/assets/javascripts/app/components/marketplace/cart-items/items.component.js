(function () {
  'use strict';

  angular.module('components.marketplace')
    .component('cartItems', {
      templateUrl: 'components/marketplace/cart-items/items.html',
      controller: 'CartItemsController',
      bindings: {
        items: '<',
        onConfigure: '&?',
        onRemove: '&?'
      }
    });
})();
