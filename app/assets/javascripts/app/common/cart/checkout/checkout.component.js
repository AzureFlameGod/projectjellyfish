(function () {
  'use strict';

  var component = {
    templateUrl: 'common/cart/checkout/checkout.html',
    controller: 'CheckoutController',
    bindings: {
      query: '<',
      items: '<'
    }
  };

  angular.module('common')
    .component('checkout', component)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('checkout', {
        parent: 'app',
        url: '/checkout?page',
        views: {
          'main@app': 'checkout'
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
              include: 'product,project',
              fields: {
                service_requests: 'type,service_name',
                products: 'type,name,setup_price,monthly_cost',
                projects: 'name'
              },
              filter: {
                state: 'configured',
                user_id: AuthService.getUser().id
              },
              page: {
                number: $transition$.params().page || 1
              },
              sort: 'created_at'
            };
          },
          items: function(query, ServiceRequestService) {
            return ServiceRequestService.search(query);
          }
        }
      });
  }
})();
