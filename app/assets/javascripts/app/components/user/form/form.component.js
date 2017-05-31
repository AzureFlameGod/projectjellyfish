(function () {
  'use strict';

  angular.module('components.user')
    .component('userForm', {
      templateUrl: 'components/user/form/form.html',
      controller: 'UserFormController',
      bindings: {
        user: '<',
        onCreate: '&?',
        onUpdate: '&?',
        onDelete: '&?',
        onCancel: '&?'
      }
    });
})();
