(function () {
  'use strict';

  angular.module('components.service')
    .controller('ServicesListController', Controller);

  /** @ngInject */
  function Controller($state, ServiceDetailService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;
    ctrl.changePage = changePage;
    ctrl.onSelect = onSelect;

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }
    }

    function reload() {
      ctrl.reloading = true;
      ServiceDetailService.search(ctrl.query)
        .then(function (results) {
          ctrl.services = results;
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }

    function changePage(event) {
      $state.go('.', {page: event.page}, {notify: false});
      ctrl.query.page.number = event.page;
      reload();
    }

    function onSelect(event) {
      $state.go('services.show', {id: event.serviceDetail.id});
    }

  }
})();
