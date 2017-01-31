(function () {
  'use strict';

  angular.module('common')
    .controller('ProviderEditController', Controller);

  /** @ngInject */
  function Controller($window, $state, ProviderService) {
    var ctrl = this;

    ctrl.onUpdate = onUpdate;
    ctrl.onCancel = onCancel;
    ctrl.onDelete = onDelete;

    function onUpdate(event) {
      return ProviderService
        .update(event.provider);
    }

    function onCancel() {
      $state.go('providers.show', {id: ctrl.provider.id});
    }

    function onDelete(event) {
      var message = 'Delete the provider "' + ctrl.provider.attributes.name + '" from the database?';

      if ($window.confirm(message)) {
        return ProviderService
          .destroy(event.provider)
          .then(function () {
            $state.go('providers');
          });
      }
    }
  }
})();
