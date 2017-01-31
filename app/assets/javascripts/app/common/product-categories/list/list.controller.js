(function () {
  'use strict';

  angular.module('common')
    .controller('ProductCategoriesListController', Controller);

  /** @ngInject */
  function Controller($state, ProductCategoryService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.reload = reload;
    ctrl.onShow = onShow;
    ctrl.onUpdate = onUpdate;

    function reload() {
      ctrl.reloading = true;

      return ProductCategoryService.search(ctrl.query)
        .then(function (response) {
          ctrl.productCategories = response;
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }

    function onShow(event) {
      $state.go('product-categories.show', {id: event.productCategory.id});
    }

    function onUpdate(event) {
      $state.go('product-categories.edit', {id: event.productCategory.id});
    }
  }
})();
