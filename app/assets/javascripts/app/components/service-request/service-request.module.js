(function () {
  'use strict';

  angular.module('components.service-request', [
    'ui.router',
    'components.reload-button'
  ]).config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    // $stateProvider
    //   .state('service-requests', {
    //     parent: 'app',
    //     url: '/service-requests',
    //     redirectTo: 'service-requests.list'
    //   });
  }
})();
