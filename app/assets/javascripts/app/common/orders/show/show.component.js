(function () {
  'use strict';

  angular.module('common')
    .component('serviceOrderShowContainer', {
      templateUrl: 'common/orders/show/container.html',
      bindings: {
        serviceOrder: '<'
      }
    })
    .component('serviceOrderShow', {
      templateUrl: 'common/orders/show/order.html',
      controller: 'ServiceOrderShowController',
      bindings: {
        serviceOrder: '<'
      }
    })
    .component('showServiceOrderRequests', {
      templateUrl: 'common/orders/show/requests.html',
      controller: 'ShowOrderRequestsController',
      bindings: {
        serviceOrder: '<',
        query: '<',
        serviceRequests: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('orders.show', {
        url: '/{id:[a-f0-9-]{36}}',
        views: {
          'main@app': 'serviceOrderShowContainer'
        },
        resolve: {
          serviceOrder: function($transition$, ServiceOrderService) {
            var id = $transition$.params().id;
            var query = {
              include: 'user',
              fields: {
                users: 'name'
              }
            };

            return ServiceOrderService.show(id, query);
          }
        },
        redirectTo: 'orders.show.order'
      })
      .state('orders.show.order', {
        views: {
          '@orders.show': 'serviceOrderShow'
        }
      })
      .state('orders.show.requests', {
        url: '/requests',
        views: {
          '@orders.show': 'showServiceOrderRequests'
        },
        params: {
          page: {
            squash: true,
            value: '1'
          }
        },
        reloadOnSearch: false,
        resolve: {
          query: function($transition$, serviceOrder) {
            return {
              include: 'product,project',
              fields: {
                products: 'type,name',
                projects: 'name'
              },
              filter: {
                service_order_id: serviceOrder.id
              },
              page: {
                number: $transition$.params().page || 1
              },
              sort: '-created_at'
            };
          },
          serviceRequests: function(query, ServiceRequestService) {
            return ServiceRequestService.search(query);
          }
        }
      });
  }
})();
