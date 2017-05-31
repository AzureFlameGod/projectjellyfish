(function () {
  'use strict';

  angular.module('common')
    .component('servicesList', {
      templateUrl: 'common/services/list/list.html',
      controller: 'ServicesListController',
      bindings: {
        query: '<',
        services: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('services.list', {
        // Annoyance: The url must include a '/' otherwise the page param is lost on initial visit. Adding 'all' so it doesn't look odd.
        url: '/all?page',
        views: {
          'main@app': 'servicesList'
        },
        params: {
          page: {
            squash: true,
            value: '1'
          }
        },
        reloadOnSearch: false,
        resolve: {
          query: function(AuthService) {
            return {
              // include: 'product,service_request',
              fields: {
                // service_requests: 'setup_price,hourly_price,monthly_price,monthly_cost',
                // products: 'type,name,description'
              },
              filter: {
                requester_id: AuthService.getUser().id
              },
              sort: '-created_at'
            };
          },
          services: function(query, ServiceDetailService) {
            return ServiceDetailService.search(query);
          }
        }

      })
  }
})();
