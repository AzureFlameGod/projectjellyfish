(function () {
  'use strict';

  angular.module('common')
    .controller('AppFooterController', AppFooterController);

  /** @ngInject */
  function AppFooterController(Config) {
    var ctrl = this;

    ctrl.version = Config.version;
  }
})();
