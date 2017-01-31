(function () {
  'use strict';

  angular.module('components.provider')
    .controller('ValidateCredentialsController', Controller);

  /** @ngInject */
  function Controller(CredentialsService, NotificationsService) {
    var ctrl = this;

    ctrl.valid = false;

    ctrl.$onChanges = onChanges;
    ctrl.validate = validate;
    ctrl.inflight = false;

    function onChanges(changes) {
      if (changes.provider) {
        ctrl.provider = angular.copy(ctrl.provider);
      }
    }

    function validate() {
      ctrl.inflight = true;
      ctrl.valid = false;

      return CredentialsService.validateCredentials(ctrl.provider)
        .then(function (result) {
          if (result.attributes.valid) {
            ctrl.valid = true;
          } else {
            NotificationsService.error('Credentials are not valid. Response: ' + result.attributes.message, 'Invalid Credentials')
          }
        })
        .finally(function() {
          ctrl.inflight = false;
        });
    }
  }
})();
