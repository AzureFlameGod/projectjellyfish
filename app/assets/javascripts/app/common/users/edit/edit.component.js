(function () {
  'use strict';

  angular.module('common')
    .component('editUser', {
      templateUrl: 'common/users/edit/edit.html',
      controller: 'EditUserController',
      bindings: {
        user: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('users.edit', {
        url: '/{id:[a-f0-9-]{36}}/edit',
        views: {
          'main@app': 'editUser'
        },
        resolve: {
          user: function($transition$, UserService) {
            var id = $transition$.params().id;

            return UserService.show(id);
          }
        }
      });
  }
})();
