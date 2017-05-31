(function () {
  'use strict';

  var component = {
    templateUrl: 'components/provider/provider/provider.html',
    controller: 'ProviderController',
    bindings: {
      provider: '<',
      onSelect: '&?',
      onUpdate: '&?',
      onDelete: '&?',
      onShow: '&?'
    }
  };

  angular.module('components.provider')
    .component('provider', component);
})();
