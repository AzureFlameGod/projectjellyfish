(function () {
  'use strict';

  angular.module('components.product')
    .controller('ProductsController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.doEvent = doEvent;

    function onChanges(changes) {
      if (changes.products) {
        ctrl.products = angular.copy(ctrl.products);
      }
    }

    function doEvent(event, product) {
      return ctrl['on' + event]({
        $event: {
          product: product
        }
      });
    }
  }
})();
