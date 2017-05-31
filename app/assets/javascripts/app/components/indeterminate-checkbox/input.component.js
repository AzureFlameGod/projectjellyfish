(function () {
  'use strict';

  angular.module('components.indeterminate-checkbox')
    .component('indeterminateCheckbox', {
      templateUrl: 'components/indeterminate-checkbox/input.html',
      controller: 'IndeterminateCheckboxController',
      bindings: {
        isChecked: '<?',
        isIndeterminate: '<?',
        isDisabled: '<?',
        onClick: '&',
        isLarge: '<?'
      },
      transclude: true
    })
})();
