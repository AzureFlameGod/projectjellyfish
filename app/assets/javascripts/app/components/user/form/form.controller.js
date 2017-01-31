(function () {
  'use strict';

  angular.module('components.user')
    .controller('UserFormController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.doEvent = doEvent;

    function onInit() {
      ctrl.model = ctrl.user.attributes;
    }

    function doEvent(event) {
      return ctrl['on' + event]({
        $event: {
          user: ctrl.user
        }
      });
    }
  }
})();
