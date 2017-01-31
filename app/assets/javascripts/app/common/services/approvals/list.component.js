(function () {
  'use strict';

  angular.module('common')
    .component('serviceApprovalsList', {
      templateUrl: 'common/services/approvals/list.html',
      controller: 'ServiceApprovalsListController',
      bindings: {
        query: '<',
        serviceRequests: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('services.approvals', {
        url: '/approvals?page',
        views: {
          'main@app': 'serviceApprovalsList'
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
                state: 'ordered'
              },
              page: {
                number: $transition$.params().page || 1
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
