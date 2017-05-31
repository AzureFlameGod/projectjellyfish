(function () {
  'use strict';

  var component = {
    templateUrl: 'components/product-category/select/select.html',
    bindings: {
      productCategories: '<',
      selected: '<',
      defaultOption: '@?',
      onSelect: '&'
    }
  };

  angular.module('components.product-category')
    .component('productCategorySelect', component);
})();
