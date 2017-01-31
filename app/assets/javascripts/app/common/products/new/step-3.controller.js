(function () {
  'use strict';

  angular.module('components.product')
    .controller('ProductNewStep3Controller', Controller);

  /** @ngInject */
  function Controller($state, ProductService) {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.onCreate = onCreate;
    ctrl.onCancel = onCancel;

    function onInit() {
      ctrl.product = ProductService.build(ctrl.provider, ctrl.productType);
    }

    function onCreate(event) {
      return ProductService.create(event.product)
        .then(function (product) {
          $state.go('products.show', {id: product.id});
        });
    }

    function onCancel() {
      $state.go('products.list');
    }
  }
})();
