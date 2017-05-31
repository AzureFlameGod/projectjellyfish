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
    ctrl.sync = sync;

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
          NotificationsService.info('Provider reconnection requested');
        })
        .catch(function () {
          NotificationsService.error('Could not request a reconnection attempt at this time.', 'Command Error');
        })
        .finally(function () {
          ctrl.reloading = false;
        })
    }

    function sync() {
      ctrl.reloading = true;

      return ProviderService.sync(ctrl.provider.id)
        .then(function () {
          NotificationsService.info('Provider data sync requested');
        })
        .catch(function () {
          NotificationsService.error('Could not request a data sync attempt at this time.', 'Command Error');
        })
        .finally(function () {
          ctrl.reloading = false;
        })
    }
  }
})();
