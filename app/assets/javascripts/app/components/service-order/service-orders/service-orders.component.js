(function () {
  'use strict';

  angular.module('components.service-order')
    .component('serviceOrders', {
      templateUrl: 'components/service-order/service-orders/service-orders.html',
      controller: 'ServiceOrdersController',
      bindings: {
        serviceOrders: '<',
        onShow: '&',
        onSort: '&?'
      }
    });
})();
