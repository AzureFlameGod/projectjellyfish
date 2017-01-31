(function () {
  'use strict';

  var component = {
    templateUrl: 'components/product-category/form/form.html',
    controller: 'ProductCategoryFormController',
    bindings: {
      productCategory: '<',
      onCreate: '&?',
      onUpdate: '&?',
      onDelete: '&?',
      onCancel: '&?'
    }
  };

  angular.module('components.product-category')
    .component('productCategoryForm', component);
})();
