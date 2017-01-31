(function () {
  'use strict';

  angular.module('common')
    .component('showProjectServices', {
      templateUrl: 'common/projects/show/services/services.html',
      controller: 'ShowProjectServicesController',
      bindings: {
        serviceDetails: '<',
        project: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('projects.show.services', {
        url: '/services?page',
        views: {
          'main@app': 'showProjectServices'
        },
        params: {
          page: {
            squash: true,
            value: '1'
          }
        },
        reloadOnSearch: false,
        resolve: {
          query: function ($transition$, project) {
            return {
              sort: 'service_name',
              filter: {
                project_id: project.id
              },
              page: {
                number: $transition$.params().page
              }
            }
          },
          serviceDetails: function(query, ServiceDetailService) {
            return ServiceDetailService.search(query);
          }
        }
      })
      .state('projects.show.services.show', {
        url: '/{serviceId:[a-f0-9-]{36}}',
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
            var id = $transition$.params().serviceId;

            return ServiceDetailService.show(id, query);
          }
        }
      });

  }

})();
