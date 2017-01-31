(function () {
  'use strict';

  angular.module('common')
    .controller('ProductShowController', Controller);

  /** @ngInject */
  function Controller(ProductService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }

      if (changes.product) {
        ctrl.product = angular.copy(ctrl.product);
      }
    }

    function reload() {
      ctrl.reloading = true;

      return ProductService.show(ctrl.product.id, ctrl.query)
        .then(function (response) {
          ctrl.product = response;
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }
  }
})();
