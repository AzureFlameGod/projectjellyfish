(function () {
  'use strict';

  angular.module('common')
    .controller('AppSettingsMailController', Controller);

  /** @ngInject */
  function Controller($state, AppSettingsService) {
    var ctrl = this;

    ctrl.onSubmit = onSubmit;
    ctrl.onCancel = onCancel;

    function onSubmit(event) {
      return AppSettingsService
        .set(event.settings);
    }

    function onCancel() {
      $state.go('app-settings');
    }
  }
})();
