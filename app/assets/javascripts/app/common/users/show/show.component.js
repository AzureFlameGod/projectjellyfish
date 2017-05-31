(function () {
  'use strict';

  angular.module('common')
    .component('userShow', {
      templateUrl: 'common/users/show/show.html',
      controller: 'UserShowController',
      bindings: {
        user: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('users.show', {
        url: '/{id:[a-f0-9-]{36}}',
        views: {
          'main@app': 'userShow'
        },
        resolve: {
          query: function() {
            return {};
          },
          user: function($transition$, query, UserService) {
            var id = $transition$.params().id;

            return UserService.show(id, query);
          }
        }
      });
  }
})();
