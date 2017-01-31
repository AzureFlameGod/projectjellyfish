(function () {
  'use strict';

  angular.module('components.settings')
    .controller('SettingsPairsController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.removePair = removePair;
    ctrl.addPair = addPair;
    ctrl.doChange = doChange;

    function onInit() {
      ctrl.nameLabel = 'Name';
      ctrl.valueLabel = 'Value';

      if (ctrl.labels) {
        ctrl.nameLabel = ctrl.labels[0];
        ctrl.valueLabel = ctrl.labels[1];
      }

      ctrl.add = ctrl.add || 'Add';
      ctrl.remove = ctrl.remove || 'Remove';

      ctrl.valueRequired = angular.isUndefined(ctrl.valueRequired) ? true : ctrl.valueRequired;
    }

    function onChanges(changes) {
      if (changes.settings) {
        ctrl.settings = angular.copy(ctrl.settings);
        ctrl.pairs = ctrl.settings[ctrl.pairsKey];
      }
    }

    function removePair(index) {
      ctrl.pairs.splice(index, 1);
      doChange();
    }

    function addPair() {
      ctrl.pairs.push({name: '', value: ''});
      doChange();
    }

    function doChange() {
      ctrl.onChange({
        $event: {
          settings: ctrl.settings
        }
      });
    }
  }
})();
