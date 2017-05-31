(function () {
  'use strict';

  angular.module('common')
    .controller('AppController', AppController);

  /** @ngInject */
  function AppController($state, AuthService, CartService, CompareService, NotificationsService) {
    var ctrl = this;

    ctrl.user = AuthService.getUser();
    ctrl.logout = logout;

    function logout() {
      return AuthService
        .logout()
        .then(signedOut);

      function signedOut() {
        // TODO: Handle user app state in a more central place
        CartService.clear();
        CompareService.clear();
        NotificationsService.clear();

        $state.go('auth.login');
      }
    }
  }
})();
