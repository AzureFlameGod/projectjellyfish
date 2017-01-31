(function () {
  'use strict';

  angular.module('common')
    .controller('ShowProjectRequestController', Controller);

  /** @ngInject */
  function Controller(ProjectRequestService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;

    function onChanges(changes) {
      if (changes.projectRequest) {
        ctrl.projectRequest = angular.copy(ctrl.projectRequest);
      }
    }

    function reload() {
      ctrl.reloading = true;

      return ProjectRequestService.show(ctrl.projectRequest.id, ctrl.query)
        .then(function(response) {
          ctrl.projectRequest = response;
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }
  }
})();
