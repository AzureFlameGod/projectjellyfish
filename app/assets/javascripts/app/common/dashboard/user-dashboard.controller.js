(function () {
  'use strict';

  angular.module('common')
    .controller('UserDashboardController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;

    function onInit() {

    }
  }
})();
