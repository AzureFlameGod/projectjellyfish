(function () {
  'use strict';

  angular.module('common')
    .controller('AppSettingsAuthController', Controller);

  /** @ngInject */
  function Controller($state, AppSettingsService) {
    var ctrl = this;

    ctrl.onSubmit = onSubmit;
    ctrl.onCancel = onCancel;

    function onSubmit(event) {
      return AppSettingsService
        .set(event.settings)
        .then(function(response) {
          ctrl.settings = angular.copy(response);
        });
    }

    function onCancel() {
      $state.go('app-settings');
    }
  }
})();
