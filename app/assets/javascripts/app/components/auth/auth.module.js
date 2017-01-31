(function () {
  'use strict';

  angular.module('components.auth', [
    'ui.router',
    'satellizer'
  ]).config(configure)
    .run(setup);

  /** @ngInject */
  function configure($authProvider) {
    $authProvider.tokenType = 'Token';
  }

  /** @ngInject */
  function setup($transitions, $state, AuthService) {
    $transitions.onStart({
      to: function (state) {
        return !!(state.data && state.data.requireAuthentication);
      }
    }, function () {
      return AuthService
        .requireAuthentication()
        .catch(function () {
          return $state.target('auth.login');
        });
    });

    $transitions.onStart({
      to: function (state) {
        return !!(state.data && state.data.requireRole);
      }
    }, function (transition) {
      return AuthService
        .requireRole(transition.to().data.requireRole)
        .catch(function () {
          return $state.target('auth.login');
        });
    });

    $transitions.onStart({
      to: 'auth.*'
    }, function () {
      if (AuthService.isAuthenticated()) {
        return $state.target('app');
      }
    });
  }
})();
