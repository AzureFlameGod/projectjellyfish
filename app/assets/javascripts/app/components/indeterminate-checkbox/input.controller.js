(function () {
  'use strict';

  angular.module('components.indeterminate-checkbox')
    .controller('IndeterminateCheckboxController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.doClick = doClick;

    function onInit() {
      ctrl.isChecked = angular.isDefined(ctrl.isChecked) ? ctrl.isChecked : false;
      ctrl.isIndeterminate = angular.isDefined(ctrl.isIndeterminate) ? ctrl.isIndeterminate : false;
    }

    function doClick() {
      if (ctrl.isDisabled) {
        return;
      }

      ctrl.isChecked = !ctrl.isChecked;

      ctrl.onClick({
        $event: {
          checked: ctrl.isChecked,
          indeterminate: ctrl.isIndeterminate
        }
      });
    }
  }
})();
