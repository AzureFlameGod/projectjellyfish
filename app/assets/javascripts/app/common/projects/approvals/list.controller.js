(function () {
  'use strict';

  angular.module('common')
    .controller('ProjectApprovalsListController', Controller);

  /** @ngInject */
  function Controller($state, ProjectRequestService, NotificationsService) {
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

      ProjectRequestService.search(ctrl.query)
        .then(function (results) {
          ctrl.projectRequests = results;
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
      ctrl.selectedRequest = event.projectRequest;
    }

    function withApproval(event) {
      ProjectRequestService.approval(event.projectRequest.id, event.projectApproval)
        .then(function () {
          var message = 'Project "' + event.projectRequest.attributes.name + '" has been ';

          ctrl.selectedRequest = null;
          reload();

          if (event.projectApproval.attributes.approval === 'approve') {
            NotificationsService.info(message + 'approved.');
          } else {
            NotificationsService.info(message + 'denied');
          }
        });
    }
  }
})();
