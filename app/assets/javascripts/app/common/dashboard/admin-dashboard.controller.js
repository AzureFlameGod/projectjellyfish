(function () {
  'use strict';

  angular.module('common')
    .controller('AdminDashboardController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;

    function onInit() {

    }
  }
})();
