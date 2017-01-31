(function () {
  'use strict';

  angular.module('common')
    .controller('ServiceRequestsListController', Controller);

  /** @ngInject */
  function Controller($state, ServiceRequestService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.onView = onView;
    ctrl.reload = reload;
    ctrl.changePage = changePage;

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }
    }

    function onView(event) {
      $state.go('services.show-request', {requestId: event.serviceRequest.id});
    }

    function reload() {
      ctrl.reloading = true;

      ServiceRequestService.search(ctrl.query)
        .then(function (results) {
          ctrl.serviceRequests = results;
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
  }
})();
