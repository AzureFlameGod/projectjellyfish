(function () {
  'use strict';

  angular.module('common')
    .controller('ProductEditController', Controller);

  /** @ngInject */
  function Controller($window, $state, NotificationsService, ProductService) {
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
        .then(function (product) {
          $state.go('products.show', {id: ctrl.product.id});
          NotificationsService.success('Product '+ product.attributes.name +' has been updated.', 'Product Updated');
        })
        .catch(function () {
          NotificationsService.error('Product not saved. There were problems with the product inputs. Check your input and try again.', 'Product Not Saved')
        });
    }

    function onDelete(event) {
      var message = 'Delete the product "'+ ctrl.product.attributes.name +'" from the database?';

      if ($window.confirm(message)) {
        return ProductService.destroy(event.product)
          .then(function (product) {
            $state.go('products.list');
            NotificationsService.success('Product '+ product.attributes.name +' has been removed.', 'Product Deleted');
          });
      }
    }

    function onCancel() {
      $state.go('products.show', {id: ctrl.product.id});
    }
  }
})();
