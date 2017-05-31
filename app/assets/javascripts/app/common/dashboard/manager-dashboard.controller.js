(function () {
  'use strict';

  angular.module('common')
    .controller('ManagerDashboardController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;

    function onInit() {

    }
  }
})();
