(function () {
  'use strict';

  angular.module('common')
    .controller('ProviderShowController', Controller);

  /** @ngInject */
  function Controller(ProviderService, NotificationsService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;
    ctrl.reconnect = reconnect;

    function onChanges(changes) {
      if (changes.provider) {
        ctrl.provider = angular.copy(ctrl.provider);
      }
    }

    function reload() {
      ctrl.reloading = true;
      return ProviderService.show(ctrl.provider.id)
        .then(function (result) {
          ctrl.provider = result;
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }

    function reconnect() {
      ctrl.reloading = true;

      return ProviderService.reconnect(ctrl.provider.id)
        .then(function () {
          NotificationsService.info('Reconnection requested');
        })
        .finally(function () {
          ctrl.reloading = false;
        })
    }
  }
})();
