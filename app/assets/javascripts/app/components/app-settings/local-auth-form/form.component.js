(function () {
  'use strict';

  angular.module('components.app-settings')
    .component('appSettingsLocalAuthForm', {
      templateUrl: 'components/app-settings/local-auth-form/form.html',
      controller: 'AppSettingsLocalAuthFormController',
      bindings: {
        settings: '<',
        onSubmit: '&?',
        onCancel: '&?'
      }
    });
})();
