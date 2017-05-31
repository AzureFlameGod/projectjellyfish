(function () {
  'use strict';

  angular.module('components.product')
    .controller('ProductNewStep2Controller', Controller);

  /** @ngInject */
  function Controller($state, ProductTypeService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.onSelect = onSelect;
    ctrl.reload = reload;
    ctrl.changePage = changePage;

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }
    }

    function onSelect(event) {
      $state.go('product-new-step-3', {productTypeId: event.productType.id});
    }

    function reload() {
      ctrl.reloading = true;

      ProductTypeService.search(ctrl.query)
        .then(function (results) {
          ctrl.productTypes = results;
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }

    function changePage(event) {
      $state.go('.', {page: event.page}, {notify: false});
      ctrl.query.page.number = event.page;
      reload();
    }
  }
})();
