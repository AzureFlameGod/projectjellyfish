(function () {
  'use strict';

  angular.module('components.product')
    .controller('ProductTypeController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.select = select;

    function select() {
      ctrl.onSelect({
        $event: {id: ctrl.productType.id}
      });
    }
  }
})();
