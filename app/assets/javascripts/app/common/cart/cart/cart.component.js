(function () {
  'use strict';

  var component = {
    templateUrl: 'common/cart/cart/cart.html',
    controller: 'CartController',
    bindings: {
      query: '<',
      items: '<'
    }
  };

  angular.module('common')
    .component('cart', component)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('cart', {
        parent: 'app',
        url: '/cart?page',
        views: {
          'main@app': 'cart'
        },
        params: {
          page: {
            squash: true,
            value: '1'
          }
        },
        reloadOnSearch: false,
        resolve: {
          query: function ($transition$, AuthService) {
            return {
              include: 'product,project',
              fields: {
                products: 'type,name,description,setup_price,monthly_cost',
                project: 'name'
              },
              filter: {
                with_states: ['pending', 'configured'],
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
