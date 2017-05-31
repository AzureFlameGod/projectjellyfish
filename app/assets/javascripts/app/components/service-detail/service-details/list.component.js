(function () {
  'use strict';

  angular.module('components.service-detail')
    .component('serviceDetails', {
      templateUrl: 'components/service-detail/service-details/list.html',
      controller: 'ServiceDetailsController',
      bindings: {
        serviceDetails: '<',
        onShow: '&?',
        onSelect: '&?',
        onUpdate: '&?',
        onDelete: '&?'
      }
    });
})();
