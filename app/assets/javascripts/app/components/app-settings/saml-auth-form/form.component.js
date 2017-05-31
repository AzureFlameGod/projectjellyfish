(function () {
  'use strict';

  angular.module('components.app-settings')
    .component('appSettingsSamlAuthForm', {
      templateUrl: 'components/app-settings/saml-auth-form/form.html',
      controller: 'AppSettingsSamlAuthFormController',
      bindings: {
        settings: '<',
        onSubmit: '&?',
        onCancel: '&?'
      }
    });
})();
