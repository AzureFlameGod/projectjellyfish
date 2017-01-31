(function () {
  'use strict';

  angular.module('components.provider')
    .controller('ProviderTypesController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.showProviderType = showProviderType;
    ctrl.selectProviderType = selectProviderType;

    function onChanges(changes) {
      if (changes.providerTypes) {
        ctrl.providerTypes = angular.copy(ctrl.providerTypes);
      }
    }

    function showProviderType(providerType) {
      return $ctrl.onShow({
        $event: {
          providerType: providerType
        }
      })
    }

    function selectProviderType(providerType) {
      return ctrl.onSelect({
        $event: {
          providerType: providerType
        }
      });
    }
  }
})();
