(function () {
  'use strict';

  angular.module('components.user')
    .controller('UserPasswordFormController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.doEvent = doEvent;

    function onInit() {
      ctrl.model = ctrl.password.attributes;
    }

    function doEvent(event) {
      return ctrl['on' + event]({
        $event: {
          password: ctrl.password
        }
      });
    }
  }
})();
