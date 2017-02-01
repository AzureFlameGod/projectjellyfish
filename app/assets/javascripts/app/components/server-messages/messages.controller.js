(function () {
  'use strict';

  angular.module('components.server-messages')
    .controller('ServerMessagesController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;

    ctrl.addMessage = addMessage;

    function onInit() {
      ctrl.messages = [];
    }

    function onChanges(changes) {
      if (changes.errors) {
        ctrl.errors = angular.copy(ctrl.errors);
      }

      displayError();
    }

    function addMessage(message) {
      ctrl.messages.push(message);
    }

    function displayError() {
      var display = null;

      angular.forEach(ctrl.messages, function(message) {
        if (display != null || angular.isUndefined(ctrl.errors[message.key])) {
          message.show = false;
          return;
        }

        if (angular.isDefined(ctrl.errors[message.key])) {
          display = message;
          message.show = true;
        }
      });
    }
  }
})();
