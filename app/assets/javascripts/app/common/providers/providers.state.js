(function () {
  'use strict';

  angular.module('common')
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('providers', {
        parent: 'admin',
        url: '/providers',
        redirectTo: 'providers.list'
      });
  }
})();
