(function () {
  'use strict';

  angular.module('common')
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('orders', {
        parent: 'app',
        url: '/orders',
        redirectTo: 'orders.list'
      });
  }
})();
