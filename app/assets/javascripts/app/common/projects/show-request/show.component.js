(function () {
  'use strict';

  angular.module('common')
    .component('showProjectRequest', {
      templateUrl: 'common/projects/show-request/show.html',
      controller: 'ShowProjectRequestController',
      bindings: {
        query: '<',
        projectRequest: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('projects.show-request', {
        url: '/requests/{id:[a-f0-9-]{36}}',
        views: {
          'main@app': 'showProjectRequest'
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
          projectRequest: function($transition$, query, ProjectRequestService) {
            var id = $transition$.params().id;

            return ProjectRequestService.show(id, query);
          }
        }
      });
  }
})();
