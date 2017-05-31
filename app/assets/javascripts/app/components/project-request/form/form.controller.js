(function () {
  'use strict';

  angular.module('components.project-request')
    .controller('ProjectRequestFormController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.budgetRegEx = /^\d{1,10}(?:\.\d{1,2})?$/;

    ctrl.$onChanges = onChanges;

    ctrl.doCreate = doCreate;
    ctrl.doUpdate = doUpdate;
    ctrl.doDelete = doDelete;

    function onChanges(changes) {
      if (changes.projectRequest) {
        ctrl.projectRequest = angular.copy(ctrl.projectRequest);
        ctrl.model = ctrl.projectRequest.attributes;
      }
    }

    function doCreate() {
      ctrl.onCreate({
        $event: {
          projectRequest: ctrl.projectRequest
        }
      });
    }

    function doUpdate() {
      ctrl.onUpdate({
        $event: {
          projectRequest: ctrl.projectRequest
        }
      });
    }

    function doDelete() {
      ctrl.onDelete({
        $event: {
          projectRequest: ctrl.projectRequest
        }
      });
    }
  }
})();
