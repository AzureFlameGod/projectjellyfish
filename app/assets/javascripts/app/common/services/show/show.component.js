(function () {
  'use strict';

  angular.module('common')
    .component('showService', {
      templateUrl: 'common/services/show/show.html',
      controller: 'ShowServiceController',
      bindings: {
        query: '<',
        serviceDetail: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('services.show', {
        url: '/{id:[a-f0-9-]{36}}',
        views: {
          'main@app': 'showService'
        },
        resolve: {
          query: function() {
            return {
              // fill in as needed
            };
          },
          serviceDetail: function($transition$, query, ServiceDetailService) {
            var id = $transition$.params().id;

            return ServiceDetailService.show(id, query);
          }
        }
      });
  }
})();
