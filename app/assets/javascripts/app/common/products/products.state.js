(function () {
  'use strict';

  angular.module('common')
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('products', {
        parent: 'manage',
        url: '/products',
        redirectTo: 'products.list'
      });
  }
})();
