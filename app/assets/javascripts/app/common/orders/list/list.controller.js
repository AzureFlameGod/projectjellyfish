(function () {
  'use strict';

  angular.module('common')
    .controller('OrdersListController', Controller);

  /** @ngInject */
  function Controller($state, ServiceOrderService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;
    ctrl.changePage = changePage;
    ctrl.onShow = onShow;
    ctrl.sort = sort;

    function onChanges(changes) {
      if (changes.serviceOrders) {
        ctrl.meta = angular.copy(ctrl.serviceOrders.meta());
        ctrl.serviceOrders = angular.copy(ctrl.serviceOrders);
      }
    }

    function reload() {
      ctrl.reloading = true;

      return ServiceOrderService.search(ctrl.query)
        .then(function(response) {
          ctrl.meta = response.meta();
          ctrl.serviceOrders = response;
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
      $state.go('orders.show', {id: event.serviceOrder.id});
    }

    function sort(event) {
      var sortParam = [
        (event.sortDir === -1 ? '-' : ''),
        event.sortBy
      ].join('');

      ctrl.query.sort = sortParam;

      reload();
    }
  }
})();
