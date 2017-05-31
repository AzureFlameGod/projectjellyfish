(function () {
  'use strict';

  angular.module('components.auth')
    .component('remoteLogin', {
      templateUrl: 'components/auth/remote-login/login.html',
      controller: 'RemoteLoginController'
    });
})();
