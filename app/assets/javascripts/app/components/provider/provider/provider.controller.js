(function () {
  'use strict';

  angular.module('components.provider')
    .controller('ProviderController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.selectProvider = selectProvider;
    ctrl.updateProvider = updateProvider;
    ctrl.deleteProvider = deleteProvider;
    ctrl.showProvider = showProvider;

    function selectProvider() {
      ctrl.onSelect({
        $event: {provider: ctrl.provider}
      });
    }

    function updateProvider() {
      ctrl.onUpdate({
        $event: {provider: ctrl.provider}
      });
    }

    function deleteProvider() {
      ctrl.onDelete({
        $event: {provider: ctrl.provider}
      });
    }

    function showProvider() {
      ctrl.onShow({
        $event: {provider: ctrl.provider}
      });
    }
  }
})();
