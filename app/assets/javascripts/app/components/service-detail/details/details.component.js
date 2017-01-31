(function () {
  'use strict';

  angular.module('components.service-detail')
    .component('serviceDetailDetails', {
      templateUrl: 'components/service-detail/details/details.html',
      bindings: {
        serviceDetail: '<'
      }
    });
})();
