(function () {
  'use strict';

  angular.module('components.provider')
    .component('providers', {
      templateUrl: 'components/provider/providers/providers.html',
      controller: 'ProvidersController',
      bindings: {
        providers: '<',
        onShow: '&?',
        onSelect: '&?',
        onUpdate: '&?',
        onDelete: '&?',
        onReconnect: '&?'
      }
    });
})();
