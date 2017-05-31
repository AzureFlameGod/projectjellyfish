(function () {
  'use strict';

  angular.module('common')
    .component('usersList', {
      templateUrl: 'common/users/list/list.html',
      controller: 'UsersListController',
      bindings: {
        query: '<',
        users: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('users.list', {
        url: '/all?page&terms',
        views: {
          'main@app': 'usersList'
        },
        params: {
          page: {
            squash: true,
            value: '1'
          },
          terms: {
            squash: true,
            value: ''
          }
        },
        reloadOnSearch: false,
        resolve: {
          query: function ($transition$) {
            return {
              sort: 'name',
              filter: {
                like: $transition$.params().terms || null,
                with_states: ['active', 'disabled']
              },
              page: {
                number: $transition$.params().page || '1'
              }
            };
          },
          users: function (query, UserService) {
            return UserService.search(query);
          }
        }
      });
  }
})();
