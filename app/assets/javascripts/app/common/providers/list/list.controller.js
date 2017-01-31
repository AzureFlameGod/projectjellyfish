(function () {
  'use strict';

  angular.module('common')
    .controller('ProvidersListController', Controller);

  /** @ngInject */
  function Controller($state, ProviderService) {
    var ctrl = this;

    ctrl.reloading = false;

    // ctrl.onSelect = onSelect;
    ctrl.onUpdate = onUpdate;
    ctrl.onShow = onShow;

    ctrl.reload = reload;

    function onShow(event) {
      $state.go('providers.show', {
        id: event.provider.id
      });
    }

    function onUpdate(event) {
      $state.go('providers.edit', {
        id: event.provider.id
      });
    }

    function reload() {
      ctrl.reloading = true;

      return ProviderService.search(ctrl.query)
        .then(function(response) {
          ctrl.providers = response;
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }
  }
})();
