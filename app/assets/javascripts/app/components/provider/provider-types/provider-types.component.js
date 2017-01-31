(function () {
  'use strict';

  angular.module('components.provider')
    .component('providerTypes', {
      templateUrl: 'components/provider/provider-types/provider-types.html',
      controller: 'ProviderTypesController',
      bindings: {
        providerTypes: '<',
        onShow: '&?',
        onSelect: '&?'
      }
    });
})();
