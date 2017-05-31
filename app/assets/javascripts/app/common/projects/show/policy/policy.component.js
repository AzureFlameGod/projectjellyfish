(function () {
  'use strict';

  angular.module('common')
    .component('projectPolicies', {
      templateUrl: 'common/projects/show/policy/policy.html',
      controller: 'ProjectPoliciesController',
      bindings: {
        query: '<',
        project: '<',
        policies: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('projects.show.policy', {
        url: '/policies',
        views: {
          'main@app': 'projectPolicies'
        },
        params: {
          page: {
            squash: true,
            value: '1'
          }
        },
        resolve: {
          query: function($transition$, project) {
            return {
              filter: {
                filterable_type: 'Project',
                filterable_id: project.id
              },
              page: {
                number: $transition$.params().page || 1
              },
              sort: '-created_at'
            };
          },
          policies: function(query, FilterService) {
            return FilterService.search(query);
          }
        }
      })
  }
})();
