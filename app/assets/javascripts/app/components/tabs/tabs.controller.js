(function () {
  'use strict';

  angular.module('components.tabs')
    .controller('TabsController', Controller);

  /** @ngInject */
  function Controller($timeout) {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.$postLink = postLink;
    ctrl.addTab = addTab;
    ctrl.selectTab = selectTab;

    function onInit() {
      ctrl.tabs = [];
    }

    function postLink() {
      $timeout(function() {
        ctrl.selectTab(parseInt(ctrl.selected || 0, 10));
      });
    }

    function addTab(tab) {
      ctrl.tabs.push(tab);
    }

    function selectTab(index) {
      if (ctrl.tabs.length == 0) {
        return;
      }

      ctrl.tabs.forEach(function (tab) {
        tab.selected = false;
      });
      ctrl.tabs[index].selected = true;
      ctrl.selected = index;
    }
  }
})();
