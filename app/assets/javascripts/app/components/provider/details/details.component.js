(function () {
  'use strict';

  angular.module('components.provider')
    .component('providerDetails', {
      templateUrl: 'components/provider/details/details.html',
      bindings: {
        provider: '<'
      }
    });
})();
