(function () {
  'use strict';

  angular.module('common')
    .controller('ShowProjectServicesController', Controller);

  /** @ngInject */
  function Controller($state, ServiceDetailService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;
    ctrl.changePage = changePage;

    ctrl.onShow = onShow;

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }

      if (changes.serviceDetails) {
        ctrl.meta = angular.copy(ctrl.serviceDetails.meta());
        ctrl.serviceDetails = angular.copy(ctrl.serviceDetails);
      }
    }

    function reload() {
      ctrl.reloading = true;

      return ServiceDetailService.search(ctrl.query)
        .then(function (services) {
          ctrl.meta = angular.copy(services.meta());
          ctrl.serviceDetails = angular.copy(services);
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

    function onShow(event) {
      $state.go('.show', {serviceId: event.serviceDetail.id});
    }
  }
})();
