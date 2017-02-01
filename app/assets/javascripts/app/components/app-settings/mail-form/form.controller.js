(function () {
  'use strict';

  angular.module('components.app-settings')
    .controller('AppSettingsMailFormController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;

    ctrl.doSubmit = doSubmit;

    function onChanges(changes) {
      if (changes.settings) {
        ctrl.settings = angular.copy(ctrl.settings);
        ctrl.model = ctrl.settings.attributes;
      }
    }

    function doSubmit() {
      return ctrl.onSubmit({
        $event: {
          settings: ctrl.settings
        }
      }).catch(function(errors) {
          ctrl.serverErrors = errors;
        });
    }
  }
})();
