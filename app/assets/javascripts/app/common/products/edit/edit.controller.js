(function () {
  'use strict';

  angular.module('common')
    .controller('ProductEditController', Controller);

  /** @ngInject */
  function Controller($window, $state, ProductService) {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.onUpdate = onUpdate;
    ctrl.onDelete = onDelete;
    ctrl.onCancel = onCancel;

    function onChanges(changes) {
      if (changes.product) {
        ctrl.product = angular.copy(ctrl.product);
      }
    }

    function onUpdate(event) {
      return ProductService.update(event.product)
        .then(function () {
          $state.go('products.show', {id: ctrl.product.id});
        });
    }

    function onDelete(event) {
      var message = 'Delete the product "'+ ctrl.product.attributes.name +'" from the database?';

      if ($window.confirm(message)) {
        return ProductService.destroy(event.product)
          .then(function () {
            $state.go('products.list');
          });
      }
    }

    function onCancel() {
      $state.go('products.show', {id: ctrl.product.id});
    }
  }
})();
