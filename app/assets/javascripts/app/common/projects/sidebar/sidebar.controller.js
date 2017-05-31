(function () {
  'use strict';

  angular.module('common')
    .controller('ProjectsSidebarController', Controller);

  /** @ngInject */
  function Controller(AuthService) {
    var ctrl = this;

    ctrl.items = [];

    ctrl.$onInit = onInit;

    function onInit() {
      ctrl.items.push({label: 'My Projects', state: 'projects.list'});
      ctrl.items.push({label: 'Request History', state: 'projects.requests'});
      if (AuthService.isManager()) {
        ctrl.items.push({divider: true});
        ctrl.items.push({label: 'Pending Requests', state: 'projects.approvals'})
      }
    }
  }
})();
