(function () {
  'use strict';

  angular.module('components.app-settings')
    .component('appSettingsMailForm', {
      templateUrl: 'components/app-settings/mail-form/form.html',
      controller: 'AppSettingsMailFormController',
      bindings: {
        settings: '<',
        onSubmit: '&?',
        onCancel: '&?'
      }
    });
})();
