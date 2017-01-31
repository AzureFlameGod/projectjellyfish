(function () {
  'use strict';

  angular.module('common')
    .controller('ShowOrderRequestsController', Controller);

  /** @ngInject */
  function Controller(ServiceRequestService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;
    ctrl.changePage = changePage;

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }

      if (changes.serviceRequests) {
        ctrl.meta = angular.copy(ctrl.serviceRequests.meta());
        ctrl.serviceRequests = angular.copy(ctrl.serviceRequests);
      }
    }

    function reload() {
      ctrl.reloading = true;

      return ServiceRequestService.search(ctrl.query)
        .then(function (response) {
          ctrl.meta = angular.copy(response.meta());
          ctrl.serviceRequests = angular.copy(response);
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }

    function changePage(event) {
      ctrl.query.page.number = event.page;
      reload();
    }
  }
})();
