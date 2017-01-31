(function () {
  'use strict';

  angular.module('common')
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('services', {
        parent: 'app',
        url: '/services',
        views: {
          'services@app': 'servicesSidebar'
        },
        redirectTo: 'services.list'
      });
  }
})();
