(function () {
  'use strict';

  angular.module('common')
    .component('appSettingsAuth', {
      templateUrl: 'common/app-settings/auth/auth.html',
      controller: 'AppSettingsAuthController',
      bindings: {
        settings: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('app-settings.auth', {
        url: '/auth',
        views: {
          'main@app': 'appSettingsAuth'
        },
        resolve: {
          settings: function (AppSettingsService) {
            return AppSettingsService.get();
          }
        }
      })
  }
})();
