(function () {
  'use strict';

  angular.module('components.product')
    .component('productForm', {
      templateUrl: 'components/product/form/form.html',
      controller: 'ProductFormController',
      bindings: {
        product: '<',
        onCreate: '&?',
        onUpdate: '&?',
        onUpdateSettings: '&?',
        onDelete: '&?',
        onCancel: '&?'
      }
    });
})();
