(function () {
  'use strict';

  angular.module('common')
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('product-categories', {
        parent: 'app',
        url: '/product-categories',
        redirectTo: 'product-categories.list'
      });
  }
})();
