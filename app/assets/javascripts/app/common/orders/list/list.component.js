(function () {
  'use strict';

  angular.module('common')
    .component('ordersList', {
      templateUrl: 'common/orders/list/list.html',
      controller: 'OrdersListController',
      bindings: {
        query: '<',
        serviceOrders: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('orders.list', {
        url: '/all?page',
        views: {
          'main@app': 'ordersList'
        },
        params: {
          page: {
            squash: true,
            value: '1'
          }
        },
        reloadOnSearch: false,
        resolve: {
          query: function($transition$, AuthService) {
            return {
              sort: '-created_at',
              page: {
                number: $transition$.params().page || 1
              },
              filter: {
                user_id: AuthService.getUser().id
              }
            };
          },
          serviceOrders: function (query, ServiceOrderService) {
            return ServiceOrderService.search(query);
          }
        }
      })
  }
})();
