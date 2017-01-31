(function () {
  'use strict';

  angular.module('components.service-order')
    .controller('ServiceOrderFormController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;

    ctrl.onChange = onChange;
    ctrl.doCreate = doCreate;
    ctrl.doUpdate = doUpdate;
    ctrl.doDelete = doDelete;

    function onInit() {
      ctrl.serviceOrder = angular.copy(ctrl.serviceOrder);
      ctrl.model = ctrl.serviceOrder.attributes;
    }

    function onChange(event) {
      ctrl.model.settings = angular.extend({}, event.settings);
    }

    function doCreate() {
      ctrl.onCreate({
        $event: {
          serviceOrder: ctrl.serviceOrder
        }
      });
    }

    function doUpdate() {
      ctrl.onUpdate({
        $event: {
          serviceOrder: ctrl.serviceOrder
        }
      });
    }

    function doDelete() {
      ctrl.onDelete({
        $event: {
          serviceOrder: ctrl.serviceOrder
        }
      });
    }
  }
})();
