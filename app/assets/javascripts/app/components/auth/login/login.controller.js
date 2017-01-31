(function () {
  'use strict';

  angular.module('components.auth')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, AppSettings, AuthService) {
    var ctrl = this;

    ctrl.login = {
      local: false,
      remote: false
    };

    ctrl.$onInit = onInit;
    ctrl.signInUser = signInUser;

    function onInit() {
      if (AppSettings.enable_signin) {
        ctrl.login.local = true;
      }

      if (AppSettings.enable_remote) {
        ctrl.login.remote = true;
      }

      ctrl.error = '';
      ctrl.user = {
        email: '',
        password: ''
      };
    }

    function signInUser(event) {
      return AuthService
        .login(event.user)
        .then(success, failure);

      function success() {
        $state.go('app');
      }

      function failure(error) {
        // TODO: Handle failure to login
        console.log(error);
      }
    }
  }
})();
