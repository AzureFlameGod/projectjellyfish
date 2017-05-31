(function () {
  'use strict';

  angular.module('components.service-request')
    .component('serviceRequestDetails', {
      templateUrl: 'components/service-request/details/details.html',
      bindings: {
        serviceRequest: '<'
      }
    });
})();
