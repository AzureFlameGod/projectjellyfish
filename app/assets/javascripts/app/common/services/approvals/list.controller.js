(function () {
  'use strict';

  angular.module('common')
    .controller('ServiceApprovalsListController', Controller);

  /** @ngInject */
  function Controller($state, ServiceRequestService, NotificationsService) {
    var ctrl = this;

    ctrl.reloading = false;
    ctrl.selectedRequest = null;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;
    ctrl.changePage = changePage;
    ctrl.onApprove = onApprove;
    ctrl.withApproval = withApproval;

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }
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

    function onApprove(event) {
      ctrl.selectedRequest = event.serviceRequest;
    }

    function withApproval(event) {
      ServiceRequestService.approval(event.serviceRequest.id, event.serviceApproval)
        .then(function () {
          var message = 'The service "' + event.projectRequest.attributes.name + '" has been ';

          ctrl.selectedRequest = null;
          reload();

          if (event.serviceApproval.attributes.approval === 'approve') {
            NotificationsService.info(message + 'approved.');
          } else {
            NotificationsService.info(message + 'denied');
          }
        });
    }
  }
})();
