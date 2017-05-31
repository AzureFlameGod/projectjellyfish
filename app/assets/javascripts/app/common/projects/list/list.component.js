(function () {
  'use strict';

  angular.module('common')
    .component('projectsList', {
      templateUrl: 'common/projects/list/list.html',
      controller: 'ProjectsListController',
      bindings: {
        query: '<',
        projects: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('projects.list', {
        url: '/all?page',
        views: {
          'main@app': 'projectsList'
        },
        params: {
          page: {
            squash: true,
            value: '1'
          }
        },
        reloadOnSearch: false,
        resolve: {
          query: function ($transition$) {
            return {
              sort: 'name',
              page: {
                number: $transition$.params().page || '1'
              }
            };
          },
          projects: function (query, ProjectService) {
            return ProjectService.search(query);
          }
        }
      });
  }
})();
