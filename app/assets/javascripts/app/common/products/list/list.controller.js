(function () {
  'use strict';

  angular.module('common')
    .controller('ProductsListController', Controller);

  /** @ngInject */
  function Controller($state, ProductService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.reload = reload;
    ctrl.changePage = changePage;
    ctrl.onShow = onShow;
    ctrl.onUpdate = onUpdate;

    function reload() {
      ctrl.reloading = true;

      return ProductService.search(ctrl.query)
        .then(function(response) {
          ctrl.products = response;
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

    function onShow(event) {
      $state.go('products.show', {id: event.product.id});
    }

    function onUpdate(event) {
      $state.go('products.edit', {id: event.product.id});
    }
  }
})();
