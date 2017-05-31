(function () {
  'use strict';

  angular.module('common')
    .component('showServiceRequest', {
      templateUrl: 'common/services/show-request/show.html',
      controller: 'ShowServiceRequestController',
      bindings: {
        query: '<',
        serviceRequest: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('services.show-request', {
        url: '/requests/{requestId:[a-f0-9-]{36}}',
        views: {
          'main@app': 'showServiceRequest'
        },
        resolve: {
          query: function() {
            return {
              include: 'user,processor',
              fields: {
                users: 'name'
              }
            };
          },
          serviceRequest: function($transition$, query, ServiceRequestService) {
            var id = $transition$.params().requestId;

            return ServiceRequestService.show(id, query);
          }
        }
      });
  }
})();
