(function () {
  'use strict';

  angular.module('components.marketplace')
    .controller('CartNavController', Controller);

  /** @ngInject */
  function Controller($q, CartService) {
    var ctrl = this;

    ctrl.$onInit = onInit;

    function onInit() {
      $q.when(CartService.getItems())
        .then(function (items) {
          ctrl.requests = items;
        });
    }
  }
})();
