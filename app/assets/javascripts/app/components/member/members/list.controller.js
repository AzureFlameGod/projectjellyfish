(function () {
  'use strict';

  angular.module('components.member')
    .controller('MembersController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.roles = ['user', 'manager', 'admin', 'owner'];
    ctrl.options = [];

    ctrl.$onChanges = onChanges;
    ctrl.$onInit = onInit;

    ctrl.doEvent = doEvent;

    function onChanges(changes) {
      if (changes.members) {
        ctrl.members = angular.copy(ctrl.members);
      }

      if (changes.maxRole) {
        ctrl.options.length = 0;

        switch (ctrl.roles.indexOf(ctrl.maxRole)) {
          case 3:
            ctrl.options.unshift({label: 'Owner', value: 'owner'});
          case 2:
            ctrl.options.unshift({label: 'Administrator', value: 'admin'});
          case 1:
            ctrl.options.unshift({label: 'Manager', value: 'manager'});
          case 0:
            ctrl.options.unshift({label: 'User', value: 'user'});
        }
      }
    }

    function onInit() {
      if (angular.isUndefined(ctrl.maxRole)) {
        ctrl.maxRole = 'undefined';
        ctrl.options.length = 0;
      }
    }

    function doEvent(event, member) {
      return ctrl['on' + event]({
        $event: {
          member: member
        }
      });
    }
  }
})();
