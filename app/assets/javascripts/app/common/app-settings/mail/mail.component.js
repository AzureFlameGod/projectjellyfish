(function () {
  'use strict';

  angular.module('common')
    .component('appSettingsMail', {
      templateUrl: 'common/app-settings/mail/mail.html',
      controller: 'AppSettingsMailController',
      bindings: {
        settings: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('app-settings.mail', {
        url: '/mail',
        views: {
          'main@app': 'appSettingsMail'
        },
        resolve: {
          settings: function (AppSettingsService) {
            return AppSettingsService.get();
          }
        }
      })
  }
})();
