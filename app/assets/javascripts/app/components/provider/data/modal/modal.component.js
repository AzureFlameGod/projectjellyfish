(function () {
  'use strict';

  angular.module('components.provider')
    .component('providerDataModal', {
      templateUrl: 'components/provider/data/modal/modal.html',
      controller: 'ProviderDataModalController',
      bindings: {
        tableSettings: '<',
        query: '<',
        placeholder: '@?',
        onSelect: '&',
        onCancel: '&'
      },
      transclude: true
    });
})();
