(function () {
  'use strict';

  angular.module('components.user')
    .controller('UsersController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.doEvent = doEvent;
    ctrl.doAction = doAction;

    function onChanges(changes) {
      if (changes.users) {
        ctrl.users = angular.copy(ctrl.users);
      }
    }

    function doEvent(event, user) {
      return ctrl['on' + event]({
        $event: {
          user: user
        }
      });
    }

    function doAction(action, user) {
      return ctrl.onAction({
        $event: {
          action: action,
          user: user
        }
      });
    }
  }
})();
