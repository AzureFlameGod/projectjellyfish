(function () {
  'use strict';

  angular.module('common')
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('app-settings', {
        parent: 'admin',
        url: '/app-settings',
        views: {
          'app-settings@app': 'appSettingsSidebar'
        }
      });
  }
})();
