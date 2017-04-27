(function () {
  'use strict';

  angular.module('common')
    .controller('AppController', AppController);

  /** @ngInject */
  function AppController($state, AuthService, CompareService) {
    var ctrl = this;

    ctrl.user = AuthService.getUser();
    ctrl.logout = logout;

    function logout() {
      return AuthService
        .logout()
        .then(signedOut);

      function signedOut() {
        // TODO: Handle user app state in a more central place
        CompareService.clear();

        $state.go('auth.login');
      }
    }
  }
})();
