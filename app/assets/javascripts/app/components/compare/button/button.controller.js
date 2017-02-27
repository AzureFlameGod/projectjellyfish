(function () {
  'use strict';

  angular.module('components.compare')
    .controller('CompareButtonController', Controller);

  /** @ngInject */
  function Controller(CompareService) {
    var ctrl = this;

    ctrl.compared = false;

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.$postLink = postLink;
    ctrl.$onDestroy = onDestroy;

    ctrl.onClick = onClick;

    function onInit() {
      CompareService.subscribe(setCompared);
    }

    function onChanges(changes) {
      if (changes.item) {
        ctrl.item = angular.copy(ctrl.item);
      }

      setCompared();
    }

    function postLink() {
    }

    function onDestroy() {
      CompareService.unsubscribe(setCompared);
    }

    function onClick() {
      if (CompareService.isListed(ctrl.item)) {
        CompareService.remove(ctrl.item);
      } else {
        CompareService.add(ctrl.item);
      }

      setCompared();
    }

    function setCompared() {
      ctrl.compared = CompareService.isListed(ctrl.item);
    }
  }
})();
