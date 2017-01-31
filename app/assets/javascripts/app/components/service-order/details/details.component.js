(function () {
  'use strict';

  angular.module('components.service-order')
    .component('serviceOrderDetails', {
      templateUrl: 'components/service-order/details/details.html',
      bindings: {
        serviceOrder: '<'
      }
    })
})();
