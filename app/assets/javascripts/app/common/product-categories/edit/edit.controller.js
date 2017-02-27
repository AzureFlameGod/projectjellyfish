(function () {
  'use strict';

  angular.module('common')
    .controller('ProductCategoryEditController', Controller);

  /** @ngInject */
  function Controller($window, $state, NotificationsService, ProductCategoryService) {
    var ctrl = this;

    ctrl.$onChanges = onChanges;

    ctrl.onUpdate = onUpdate;
    ctrl.onDelete = onDelete;
    ctrl.onCancel = onCancel;

    function onChanges(changes) {
      if (changes.productCategory) {
        ctrl.productCategory = angular.copy(ctrl.productCategory);
      }
    }

    function onUpdate(event) {
      return ProductCategoryService.update(event.productCategory)
        .then(function (category) {
          NotificationsService.success('Category \'' +category.attributes.name + '\' has been updated.', 'Category Updated');
          $state.go('product-categories.list')
        });
    }

    function onDelete(event) {
      var message = 'Delete the category "' + ctrl.productCategory.attributes.name + '" from the database?';

      if ($window.confirm(message)) {
        return ProductCategoryService.delete(event.productCategory)
          .then(function (category) {
            NotificationsService.success('Category \'' +category.attributes.name + '\' has been deleted.', 'Category Deleted');
            $state.go('product-categories.list');
          });
      }
    }

    function onCancel() {
      $state.go('product-categories.list');
    }
  }
})();
