(function () {
  'use strict';

  angular.module('common')
    .component('newUser', {
      templateUrl: 'common/users/new/new.html',
      controller: 'NewUserController',
      bindings: {
        user: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('users.new', {
        url: '/new',
        views: {
          'main@app': 'newUser'
        }
      });
  }
})();
