(function () {
  'use strict';

  angular.module('common')
    .component('projectApprovalsList', {
      templateUrl: 'common/projects/approvals/list.html',
      controller: 'ProjectApprovalsListController',
      bindings: {
        query: '<',
        projectRequests: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('projects.approvals', {
        url: '/approvals?page',
        views: {
          'main@app': 'projectApprovalsList'
        },
        params: {
          page: {
            squash: true,
            value: '1'
          }
        },
        data: {
          requireRole: ['manager', 'admin']
        },
        reloadOnSearch: false,
        resolve: {
          query: function ($transition$) {
            return {
              sort: '-created_at',
              include: 'user',
              fields: {
                users: 'name'
              },
              filter: {
                status: 'pending'
              },
              page: {
                number: $transition$.params().page || 1
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
