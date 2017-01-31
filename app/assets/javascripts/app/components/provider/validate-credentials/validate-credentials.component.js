(function () {
  'use strict';

  var component = {
    templateUrl: 'components/provider/validate-credentials/validate-credentials.html',
    controller: 'ValidateCredentialsController',
    bindings: {
      provider: '<',
      disabled: '<'
    }
  };

  angular.module('components.provider')
    .component('validateCredentials', component);
})();
