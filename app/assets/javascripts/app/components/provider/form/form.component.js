(function () {
  'use strict';

  var component = {
    templateUrl: 'components/provider/form/form.html',
    controller: 'ProviderFormController',
    bindings: {
      provider: '<',
      onCreate: '&?',
      onUpdate: '&?',
      onUpdateCredentials: '&?',
      onDelete: '&?',
      onCancel: '&?'
    }
  };

  angular.module('components.provider')
    .component('providerForm', component);
})();
