(function () {
  'use strict';

  angular.module('components.service')
    .controller('ServiceSpecificsController', Controller);

  /** @ngInject */
  function Controller($window) {
    var ctrl = this;

    ctrl.actions = [];

    ctrl.$onChanges = onChanges;
    ctrl.hasAction = hasAction;
    ctrl.takeAction = takeAction;
    ctrl.confirmAction = confirmAction;

    function onChanges(changes) {
      if (changes.service) {
        ctrl.actions = angular.copy(ctrl.service.attributes.actions);
        if (!angular.isArray(ctrl.actions)) {
          // Handle the case where the actions are in string form
          ctrl.actions = ctrl.actions.split(/,\s?/);
        }
        ctrl.service = angular.copy(ctrl.service);
        ctrl.status = ctrl.service.attributes.status;
        ctrl.health = ctrl.service.attributes.health;
        ctrl.details = ctrl.service.attributes.details;
      }
    }

    function hasAction(action) {
      return -1 != ctrl.actions.indexOf(action);
    }

    function takeAction(action) {
      return ctrl.onAction({
        $event: {
          action: action
        }
      });
    }

    function confirmAction(action, message) {
      if ($window.confirm(message)) {
        return ctrl.takeAction(action);
      }
    }
  }
})();
