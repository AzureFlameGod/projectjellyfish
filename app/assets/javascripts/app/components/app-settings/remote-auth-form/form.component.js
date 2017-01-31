(function () {
  'use strict';

  angular.module('components.app-settings')
    .component('appSettingsRemoteAuthForm', {
      templateUrl: 'components/app-settings/remote-auth-form/form.html',
      controller: 'AppSettingsRemoteAuthFormController',
      bindings: {
        settings: '<',
        onSubmit: '&?',
        onCancel: '&?'
      }
    });
})();
