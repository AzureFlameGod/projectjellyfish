(function () {
  'use strict';

  angular.module('common')
    .component('projectRequestsList', {
      templateUrl: 'common/projects/history/list.html',
      controller: 'ProjectRequestsListController',
      bindings: {
        query: '<',
        projectRequests: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('projects.requests', {
        url: '/requests?page',
        views: {
          'main@app': 'projectRequestsList'
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
                user_id: AuthService.getUser().id
              },
              page: {
                number: $transition$.params().page || '1'
              }
            };
          },
          projectRequests: function (query, ProjectRequestService) {
            return ProjectRequestService.search(query);
          }
        }
      });
  }
})();
