(function () {
  'use strict';

  angular.module('common')
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('users', {
        parent: 'admin',
        url: '/users',
        redirectTo: 'users.list'
      });
  }
})();
