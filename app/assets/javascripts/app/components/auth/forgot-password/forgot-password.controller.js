(function () {
  'use strict';

  angular.module('components.auth')
    .controller('ForgotPasswordController', ForgotPasswordController);

  /** @ngInject */
  function ForgotPasswordController($state, AuthService) {
    var ctrl = this;

    ctrl.requestReset = requestReset;

    function requestReset(event) {
      return AuthService
        .requestPasswordReset(event.email)
        .then(function () {
          $state.go('auth.reset-password');
        });
    }
  }
})();
