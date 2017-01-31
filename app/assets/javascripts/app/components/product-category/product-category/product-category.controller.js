(function () {
  'use strict';

  angular.module('components.product-category')
    .controller('ProductCategoryController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.selectProductCategory = selectProductCategory;

    function selectProductCategory() {
      ctrl.onSelect({
        $event: {id: ctrl.productCategory.id}
      });
    }
  }
})();
