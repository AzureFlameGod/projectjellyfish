(function () {
  'use strict';

  angular.module('components.marketplace')
    .controller('CartItemsController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.doConfigure = doConfigure;
    ctrl.doRemove = doRemove;

    function onChanges(changes) {
      if (changes.items) {
        ctrl.items = angular.copy(ctrl.items);
      }
    }

    function doConfigure(item) {
      return ctrl.onConfigure({
        $event: {
          serviceRequest: item
        }
      });
    }

    function doRemove(item) {
      return ctrl.onRemove({
        $event: {
          serviceRequest: item
        }
      });
    }
  }
})();
