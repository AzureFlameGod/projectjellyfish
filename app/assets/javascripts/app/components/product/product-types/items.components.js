(function () {
  'use strict';

  angular.module('components.product')
    .component('productTypes', {
      templateUrl: 'components/product/product-types/items.html',
      controller: 'ProductTypesController',
      bindings: {
        productTypes: '<',
        onSelect: '&?',
        onUpdate: '&?',
        onDelete: '&?',
        onShow: '&?'
      }
    })
})();
