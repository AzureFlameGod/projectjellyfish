(function () {
  'use strict';

  angular.module('components.product-category')
    .controller('ProductCategoriesController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.showItem = showItem;
    ctrl.selectItem = selectItem;
    ctrl.updateItem = updateItem;
    ctrl.deleteItem = deleteItem;

    function onChanges(changes) {
      if (changes.productCategories) {
        ctrl.productCategories = angular.copy(ctrl.productCategories);
      }
    }

    function showItem(category) {
      return ctrl.onShow({
        $event: {
          productCategory: category
        }
      });
    }

    function selectItem(category) {
      return ctrl.onSelect({
        $event: {
          productCategory: category
        }
      });
    }

    function updateItem(category) {
      return ctrl.onUpdate({
        $event: {
          productCategory: category
        }
      });
    }

    function deleteItem(category) {
      return ctrl.onDelete({
        $event: {
          productCategory: category
        }
      });
    }
  }
})();
