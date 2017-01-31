(function () {
  'use strict';

  var component = {
    templateUrl: 'components/product/details/details.html',
    bindings: {
      product: '<'
    }
  };

  angular.module('components.product')
    .component('productDetails', component);
})();
