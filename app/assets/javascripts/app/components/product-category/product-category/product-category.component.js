(function () {
  'use strict';

  var component = {
    templateUrl: 'components/product-category/product-category/product-category.html',
    controller: 'ProductCategoryController',
    bindings: {
      productCategory: '<',
      onSelect: '&'
    }
  };

  angular.module('components.product-category')
    .component('productCategory', component);
})();
