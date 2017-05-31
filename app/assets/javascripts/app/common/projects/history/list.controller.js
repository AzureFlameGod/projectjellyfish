(function () {
  'use strict';

  angular.module('common')
    .controller('ProjectRequestsListController', Controller);

  /** @ngInject */
  function Controller($state, ProjectRequestService) {
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
      $state.go('projects.show-request', {id: event.projectRequest.id});
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
  }
})();
