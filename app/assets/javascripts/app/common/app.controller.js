(function () {
  'use strict';

  angular.module('common')
    .controller('AppController', AppController);

  /** @ngInject */
  function AppController($state, AuthService) {
    var ctrl = this;

    ctrl.user = AuthService.getUser();
    ctrl.logout = logout;

    function logout() {
      return AuthService
        .logout()
        .then(signedOut);

      function signedOut() {
        $state.go('auth.login');
      }
    }
  }
})();
