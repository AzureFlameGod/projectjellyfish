(function () {
  'use strict';

  angular.module('components.server-messages')
    .component('serverMessages', {
      templateUrl: 'components/server-messages/messages.html',
      controller: 'ServerMessagesController',
      bindings: {
        errors: '<'
      },
      transclude: true
    })
    .component('serverMessage', {
      templateUrl: 'components/server-messages/message.html',
      controller: 'ServerMessageController',
      bindings: {
        key: '@message'
      },
      require: {
        messages: '^^serverMessages'
      }
    })
})();
