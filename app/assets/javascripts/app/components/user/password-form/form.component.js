(function () {
  'use strict';

  angular.module('components.user')
    .component('userPasswordForm', {
      templateUrl: 'components/user/password-form/form.html',
      controller: 'UserPasswordFormController',
      bindings: {
        password: '<',
        onCreate: '&?',
        onUpdate: '&?',
        onCancel: '&?'
      }
    });
})();
