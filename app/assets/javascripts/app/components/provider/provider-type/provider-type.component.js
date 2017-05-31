(function () {
  'use strict';

  var component = {
    templateUrl: 'components/provider/provider-type/provider-type.html',
    controller: 'ProviderTypeController',
    bindings: {
      providerType: '<',
      onSelect: '&'
    }
  };

  angular.module('components.provider')
    .component('providerType', component);
})();
