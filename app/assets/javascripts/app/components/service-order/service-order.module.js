(function () {
  'use strict';

  angular.module('components.service-order', [
    'ui.router'
  ]).config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    // $stateProvider
    //   .state('service-orders', {
    //     parent: 'app',
    //     url: '/service-orders',
    //     redirectTo: 'service-orders.list'
    //   });
  }
})();
