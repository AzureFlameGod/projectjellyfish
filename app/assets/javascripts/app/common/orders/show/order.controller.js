(function () {
  'use strict';

  angular.module('components.service-order')
    .controller('ServiceOrderShowController', Controller);

  /** @ngInject */
  function Controller(ServiceOrderService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.reload = reload;

    function reload() {
      var query = {
        include: 'user',
        fields: {
          users: 'name'
        }
      };

      ctrl.reloading = true;

      return ServiceOrderService.show(ctrl.serviceOrder.id, query)
        .then(function (results) {
          ctrl.serviceOrder = results;
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }
  }
})();
