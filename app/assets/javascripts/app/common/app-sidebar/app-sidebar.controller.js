(function () {
  'use strict';

  angular.module('common')
    .controller('AppSidebarController', Controller);

  /** @ngInject */
  function Controller(AuthService) {
    var ctrl = this;

    ctrl.items = [
      { label: 'Projects', icon: 'fa-cubes', state: 'projects' },
      { label: 'Services', icon: 'fa-folder-o', state: 'services' },
      { label: 'Orders', icon: 'fa-shopping-basket', state: 'orders' },
      { label: 'Marketplace', icon: 'fa-shopping-basket', state: 'marketplace' }
    ];

    ctrl.manage = [
      { label: 'Products', icon: 'fa-cube', state: 'products' },
      { label: 'Categories', icon: 'fa-folder-open', state: 'product-categories' },
      { label: 'Project Questions', icon: 'fa-folder-open', state: 'project-questions' }
    ];

    ctrl.admin = [
      { label: 'Users', icon: 'fa-user', state: 'users' },
      // { label: 'Groups', icon: 'fa-users', state: 'groups' },
      { label: 'Providers', icon: 'fa-cloud', state: 'providers' },
      { label: 'Settings', icon: 'fa-cogs', state: 'app-settings' }
    ];

    ctrl.$onInit = onInit;

    function onInit() {
      var role = AuthService.getUser().attributes.role || 'user';

      ctrl.isManager = role == 'manager' || role == 'admin';
      ctrl.isAdministrator = role == 'admin';
    }
  }
})();
