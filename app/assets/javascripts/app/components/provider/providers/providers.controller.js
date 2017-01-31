(function () {
  'use strict';

  angular.module('components.provider')
    .controller('ProvidersController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.doEvent = doEvent;

    function onChanges(changes) {
      if (changes.providers) {
        ctrl.providers = angular.copy(ctrl.providers);
      }
    }

    function doEvent(event, provider) {
      return ctrl['on' + event]({
        $event: {
          provider: provider
        }
      });
    }
  }
})();
