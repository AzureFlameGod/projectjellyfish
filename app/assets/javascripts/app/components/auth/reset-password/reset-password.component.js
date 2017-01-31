(function () {
  'use strict';

  var resetPassword = {
    templateUrl: 'components/auth/reset-password/reset-password.html',
    controller: 'ResetPasswordController'
  };

  angular.module('components.auth')
    .component('resetPassword', resetPassword)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('auth.reset-password', {
        url: '/reset-password',
        component: 'resetPassword'
      });
  }
})();
