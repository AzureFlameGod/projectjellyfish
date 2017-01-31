(function () {
  'use strict';

  var component = {
    templateUrl: 'components/service-order/form/form.html',
    controller: 'ServiceOrderFormController',
    bindings: {
      serviceOrder: '<',
      onCreate: '&?'
    }
  };

  angular.module('components.service-order')
    .component('serviceOrderForm', component);
})();
