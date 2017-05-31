(function () {
  'use strict';

  var authForm = {
    templateUrl: 'components/auth/auth-form/auth-form.html',
    controller: 'AuthFormController',
    bindings: {
      user: '<',
      message: '@',
      button: '@',
      onSubmit: '&'
    }
  };

  angular.module('components.auth')
    .component('authForm', authForm);
})();
