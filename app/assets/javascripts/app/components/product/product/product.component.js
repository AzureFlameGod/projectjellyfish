(function () {
  'use strict';

  var component = {
    templateUrl: 'components/product/product/product.html',
    controller: 'ProductController',
    bindings: {
      product: '<',
      onSelect: '&?',
      onShow: '&?',
      onUpdate: '&?',
      onDelete: '&?',
      onAddToCart: '&?'
    }
  };

  angular.module('components.product')
    .component('product', component);
})();
