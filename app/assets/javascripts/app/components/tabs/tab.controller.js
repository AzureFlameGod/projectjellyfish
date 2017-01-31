(function () {
  'use strict';

  angular.module('components.tabs')
    .controller('TabController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;

    function onInit() {
      ctrl.tab = {
        label: this.label,
        selected: false
      };

      ctrl.tabs.addTab(ctrl.tab);
    }
  }
})();
