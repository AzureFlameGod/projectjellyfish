(function () {
  'use strict';

  angular.module('common')
    .component('showProjectUsers', {
      templateUrl: 'common/projects/show/users/list.html',
      controller: 'ShowProjectUsersController',
      bindings: {
        members: '<',
        member: '<',
        project: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('projects.show.users', {
        url: '/users?page',
        views: {
          'main@app': 'showProjectUsers'
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
              sort: 'user_name',
              filter: {
                project_id: project.id
              },
              page: {
                number: $transition$.params().page
              }
            }
          },
          members: function(query, MemberService) {
            return MemberService.search(query);
          }
        }
      });
  }
})();
