(function () {
  'use strict';

  angular.module('components.server-messages')
    .controller('ServerMessageController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;

    function onInit() {
      ctrl.message = {
        key: ctrl.key,
        show: false,
        text: ''
      };

      ctrl.messages.addMessage(ctrl.message);
    }
  }
})();
