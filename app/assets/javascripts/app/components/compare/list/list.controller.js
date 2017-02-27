(function () {
  'use strict';

  angular.module('components.compare')
    .controller('CompareListController', Controller);

  /** @ngInject */
  function Controller(CompareService) {
    var ctrl = this;

    ctrl.comparing = false;
    ctrl.items = [];

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.$onDestroy = onDestroy;

    ctrl.onRemove = onRemove;

    function onInit() {
      CompareService.subscribe(itemsChanged);
      ctrl.items = CompareService.list();
    }

    function onChanges(changes) {
    }

    function onDestroy() {
      CompareService.unsubscribe(itemsChanged);
    }

    function onRemove(item) {
      CompareService.remove(item);
    }

    function itemsChanged() {
      ctrl.items = CompareService.list();
    }
  }
})();
