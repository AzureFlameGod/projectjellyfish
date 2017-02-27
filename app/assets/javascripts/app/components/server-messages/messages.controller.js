(function () {
  'use strict';

  angular.module('components.server-messages')
    .controller('ServerMessagesController', Controller);

  /** @ngInject */
  function Controller(ErrorsService) {
    var ctrl = this;

    var errors = {};

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.$onDestroy = onDestroy;

    // Used by child components to register themselves.
    ctrl.addMessage = addMessage;

    function onInit() {
      ctrl.messages = [];
      ErrorsService.subscribe(displayError);
    }

    function onChanges(changes) {
    }

    function onDestroy() {
      ErrorsService.unsubscribe(displayError);
    }

    function addMessage(message) {
      ctrl.messages.push(message);
    }

    function displayError(errors) {
      var message;

      // Hide all messages
      angular.forEach(ctrl.messages, function (message) {
        message.show = false;
      });

      if (angular.isUndefined(errors.errors[ctrl.path])) {
        return;
      }

      message = ctrl.messages.find(function(message) {
        return angular.isDefined(errors.errors[ctrl.path][message.key]);
      });

      if (message) {
        message.show = true;
        message.text = errors.errors[ctrl.path][message.key];
      }
    }
  }
})();
