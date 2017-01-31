(function () {
  'use strict';

  angular.module('components.product')
    .controller('ProductController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.selectProduct = selectProduct;
    ctrl.showProduct = showProduct;
    ctrl.updateProduct = updateProduct;
    ctrl.deleteProduct = deleteProduct;
    ctrl.addToCart = addToCart;

    function onChanges(changes) {
      if (changes.product) {
        ctrl.product = angular.copy(ctrl.product);
      }
    }

    function selectProduct() {
      ctrl.onSelect({
        $event: {id: ctrl.product.id}
      });
    }

    function showProduct() {
      ctrl.onShow({
        $event: {id: ctrl.product.id}
      });
    }

    function updateProduct() {
      ctrl.onUpdate({
        $event: {id: ctrl.product.id}
      });
    }

    function deleteProduct() {
      ctrl.onDelete({
        $event: {id: ctrl.product.id}
      });
    }

    function addToCart() {
      ctrl.onAddToCart({
        $event: {id: ctrl.product.id}
      });
    }
  }
})();
