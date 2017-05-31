(function () {
  'use strict';

  angular.module('common')
    .controller('ProviderNewStep1Controller', Controller);

  /** @ngInject */
  function Controller($state) {
    var ctrl = this;

    ctrl.onSelect = onSelect;

    function onSelect(event) {
      $state.go('provider-new-step-2', {
        id: event.providerType.id
      });
    }
  }
})();
