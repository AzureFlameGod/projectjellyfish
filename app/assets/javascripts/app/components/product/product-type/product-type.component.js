(function () {
  'use strict';

  var component = {
    templateUrl: 'components/product/product-type/product-type.html',
    controller: 'ProductTypeController',
    bindings: {
      productType: '<',
      onSelect: '&'
    }
  };

  angular.module('components.product')
    .component('productType', component);
})();
