(function () {
  'use strict';

  angular.module('common')
    .component('serviceRequestsList', {
      templateUrl: 'common/services/history/list.html',
      controller: 'ServiceRequestsListController',
      bindings: {
        query: '<',
        serviceRequests: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('services.requests', {
        url: '/requests?page',
        views: {
          'main@app': 'serviceRequestsList'
        },
        params: {
          page: {
            squash: true,
            value: '1'
          }
        },
        reloadOnSearch: false,
        resolve: {
          query: function (AuthService, $transition$) {
            return {
              sort: '-created_at',
              include: 'user',
              fields: {
                users: 'name'
              },
              filter: {
                with_states: ['ordered', 'approved', 'denied', 'delayed'],
                user_id: AuthService.getUser().id
              },
              page: {
                number: $transition$.params().page || '1'
              }
            };
          },
          serviceRequests: function (query, ServiceRequestService) {
            return ServiceRequestService.search(query);
          }
        }
      });
  }
})();
