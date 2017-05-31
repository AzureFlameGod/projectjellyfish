(function () {
  'use strict';

  angular.module('common')
    .controller('ServicesSidebarController', Controller);

  /** @ngInject */
  function Controller(AuthService) {
    var ctrl = this;

    ctrl.items = [];

    ctrl.$onInit = onInit;

    function onInit() {
      ctrl.items.push({label: 'My Services', state: 'services.list'});
      ctrl.items.push({label: 'Request History', state: 'services.requests'});
      if (AuthService.isManager()) {
        ctrl.items.push({divider: true});
        ctrl.items.push({label: 'Pending Requests', state: 'services.approvals'})
      }
    }
  }
})();
