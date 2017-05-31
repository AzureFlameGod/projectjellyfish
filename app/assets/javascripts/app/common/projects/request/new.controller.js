(function () {
  'use strict';

  angular.module('common')
    .controller('RequestProjectController', Controller);

  /** @ngInject */
  function Controller($state, NotificationsService, ProjectRequestService) {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.onCreate = onCreate;
    ctrl.onCancel = onCancel;

    function onInit() {
      ctrl.projectRequest = ProjectRequestService.build();
    }

    function onCreate(event) {
      return ProjectRequestService.create(event.projectRequest)
        .then(function (projectRequest) {
          $state.go('projects.show-request', {
            id: projectRequest.id
          });
          NotificationsService.success('Request to create project has been sent.', 'Project Requested');
        });
    }

    function onCancel() {
      $state.go('projects.requests');
    }
  }
})();
