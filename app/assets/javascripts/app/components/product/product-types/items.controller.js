(function () {
  'use strict';

  angular.module('components.product')
    .controller('ProductTypesController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.showProductType = showProductType;
    ctrl.selectProductType = selectProductType;
    ctrl.updateProductType = updateProductType;
    ctrl.deleteProductType = deleteProductType;

    function onChanges(changes) {
      if (changes.productTypes) {
        ctrl.productTypes = angular.copy(ctrl.productTypes);
      }
    }

    function showProductType(productType) {
      return ctrl.onShow({
        $event: {
          productType: productType
        }
      });
    }

    function selectProductType(productType) {
      return ctrl.onSelect({
        $event: {
          productType: productType
        }
      });
    }

    function updateProductType(productType) {
      return ctrl.onUpdate({
        $event: {
          productType: productType
        }
      });
    }

    function deleteProductType(productType) {
      return ctrl.onDelete({
        $event: {
          productType: productType
        }
      });
    }
  }
})();
