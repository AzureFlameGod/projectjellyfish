(function () {
  'use strict';

  angular.module('components.product')
    .controller('ProductNewStep1Controller', Controller);

  /** @ngInject */
  function Controller($state, ProviderService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.onSelect = onSelect;
    ctrl.reload = reload;
    ctrl.changePage = changePage;

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }
    }

    function reload() {
      ctrl.reloading = true;

      ProviderService.search(ctrl.query)
        .then(function (results) {
          ctrl.providers = results;
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }

    function changePage(event) {
      ctrl.query.page.number = event.page;
      reload();
    }

    function onSelect(event) {
      $state.go('product-new-step-2', {providerId: event.provider.id});
    }
  }
})();
