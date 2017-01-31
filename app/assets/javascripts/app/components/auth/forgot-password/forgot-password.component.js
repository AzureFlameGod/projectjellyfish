(function () {
  'use strict';

  var forgotPassword = {
    templateUrl: 'components/auth/forgot-password/forgot-password.html',
    controller: 'ForgotPasswordController'
  };

  angular.module('components.auth')
    .component('forgotPassword', forgotPassword)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('auth.forgot-password', {
        url: '/forgot-password',
        component: 'forgotPassword'
      });
  }
})();
