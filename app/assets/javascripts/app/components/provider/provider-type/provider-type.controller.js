(function () {
  'use strict';

  angular.module('components.provider')
    .controller('ProviderTypeController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.select = select;

    function select() {
      ctrl.onSelect({
        $event: {id: ctrl.providerType.id}
      });
    }
  }
})();
