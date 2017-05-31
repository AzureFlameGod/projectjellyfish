(function () {
  'use strict';

  angular.module('components.settings')
    .controller('SettingsController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.doChange = doChange;
    ctrl.clear = clear;

    function onInit() {
      ctrl.property = ctrl.property || 'settings';
    }

    function onChanges(changes) {
      if (changes.property) {
        ctrl.property = ctrl.property || 'settings';
      }

      if (changes.item) {
        ctrl.item = angular.copy(ctrl.item);
        ctrl.model = ctrl.item.attributes[ctrl.property];
      }
    }

    function doChange(event) {
      var changes = {};

      // Accepts data from SettingsPairs, adding others might require refactoring this.
      if (angular.isDefined(event)) {
        // .settings here is the key used by settings-pairs; it is not tied to the parent object key in any way.
        ctrl.model = angular.extend({}, event.settings);
      }

      ctrl.model = angular.copy(ctrl.model);
      changes[ctrl.property] = ctrl.model;

      ctrl.onChange({
        $event: changes
      });
    }

    function clear(clear) {
      if (!angular.isArray(clear)) {
        clear = [clear];
      }

      clear.forEach(function (key) {
        delete ctrl.model[key];
      });

      doChange();

      return true;
    }
  }
})();
