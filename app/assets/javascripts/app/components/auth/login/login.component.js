(function () {
  'use strict';

  var login = {
    templateUrl: 'components/auth/login/login.html',
    controller: 'LoginController'
  };

  angular.module('components.auth')
    .component('login', login)
    .config(configure)
    .run(setup);

  /** @ngInject */
  function configure($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        redirectTo: 'auth.login',
        url: '/auth',
        template: '<div ui-view></div>'
      })
      .state('auth.login', {
        url: '/login',
        component: 'login'
      })
      .state('auth.remote-login', {
        redirectTo: 'auth.login',
        url: '^/remote_login',
        views: {}
      });
    $urlRouterProvider.otherwise('/auth/login');
  }

  /** @ngInject */
  function setup($window, $transitions, $state, $auth) {
    $transitions.onBefore({
      to: 'auth.remote-login'
    }, function () {
      $auth.setToken(angular.copy($window.TOKEN));

      if ($auth.isAuthenticated()) {
        return $state.target('app');
      }
    });
  }
})();
