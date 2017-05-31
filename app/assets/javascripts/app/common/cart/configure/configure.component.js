(function () {
  'use strict';

  var component = {
    templateUrl: 'common/cart/configure/configure.html',
    controller: 'CartItemConfigureController',
    bindings: {
      serviceRequest: '<',
      // projects: '<'
    }
  };

  angular.module('common')
    .component('cartItemConfigure', component)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('cart.configure', {
        url: '/configure/:id',
        views: {
          'main@app': 'cartItemConfigure'
        },
        resolve: {
          // projects: function (ProjectService) {
          //   var query = {
          //     fields: {
          //       projects: 'name'
          //     },
          //     sort: 'name'
          //   };
          //
          //   return ProjectService.search(query);
          // },
          serviceRequest: function ($transition$, ServiceRequestService) {
            var id = $transition$.params().id;
            var query = {
              include: 'product',
              fields: {
                service_requests: 'type,service_name,request_message,product_id,project_id,settings',
                products: 'type,name,description,setup_price,hourly_price,monthly_price,monthly_cost'
              }
            };

            return ServiceRequestService.show(id, query);
          }
        }
      })
  }
})();
