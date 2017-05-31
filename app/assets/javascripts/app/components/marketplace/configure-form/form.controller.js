(function () {
  'use strict';

  angular.module('components.marketplace')
    .controller('ConfigureFormController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;

    ctrl.onChange = onChange;
    ctrl.doUpdate = doUpdate;
    ctrl.doDelete = doDelete;

    function onChanges(changes) {
      if (changes.serviceRequest) {
        ctrl.serviceRequest = angular.copy(ctrl.serviceRequest);
        ctrl.model = ctrl.serviceRequest.attributes;
      }
    }

    function onChange(event) {
      ctrl.model.settings = angular.extend({}, event.settings);
    }

    function doUpdate() {
      ctrl.onUpdate({
        $event: {
          serviceRequest: ctrl.serviceRequest
        }
      });
    }

    function doDelete() {
      ctrl.onDelete({
        $event: {
          serviceRequest: ctrl.serviceRequest
        }
      });
    }
  }
})();
