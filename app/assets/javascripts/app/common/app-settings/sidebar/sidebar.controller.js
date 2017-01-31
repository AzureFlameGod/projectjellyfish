(function () {
  'use strict';

  angular.module('common')
    .controller('AppSettingsSidebarController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.items = [];

    ctrl.$onInit = onInit;

    function onInit() {
      // Unless it makes sense otherwise per case keep the items labels alphabetically sorted.
      ctrl.items.push({label: 'Authentication', state: 'app-settings.auth'});
      ctrl.items.push({label: 'Mail', state: 'app-settings.mail'});
    }
  }
})();
