(function () {
  'use strict';

  angular.module('components.product')
    .component('products', {
      templateUrl: 'components/product/products/items.html',
      controller: 'ProductsController',
      bindings: {
        products: '<',
        comparable: '<',
        onSelect: '&?',
        onUpdate: '&?',
        onDelete: '&?',
        onShow: '&?',
        onAddToCart: '&?',
        onAddToProject: '&?'
      }
    })
})();
