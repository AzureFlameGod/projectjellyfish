(function () {
  'use strict';

  angular.module('common')
    .controller('ProviderNewStep2Controller', Controller);

  /** @ngInject */
  function Controller($state, ProviderService) {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.onCreate = onCreate;
    ctrl.onCancel = onCancel;

    function onInit() {
      ctrl.provider = ProviderService.build();
      ctrl.provider.attributes.type = ctrl.providerType.attributes.type.replace(/_type$/, '');
      ctrl.provider.attributes.provider_type_id = ctrl.providerType.id;
      ctrl.provider.attributes.tag_list = ctrl.providerType.attributes.tag_list;
    }

    function onCreate(event) {
      return ProviderService.create(event.provider)
        .then(function (provider) {
          $state.go('providers.show', {id: provider.id});
        });
    }

    function onCancel() {
      $state.go('providers.list');
    }
  }
})();
