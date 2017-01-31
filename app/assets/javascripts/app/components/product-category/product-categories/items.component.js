(function () {
  'use strict';

  angular.module('components.product-category')
    .component('productCategories', {
      templateUrl: 'components/product-category/product-categories/items.html',
      controller: 'ProductCategoriesController',
      bindings: {
        productCategories: '<',
        onShow: '&?',
        onSelect: '&?',
        onUpdate: '&?',
        onDelete: '&?'
      }
    });
})();
