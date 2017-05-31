(function () {
  'use strict';

  angular.module('components.user')
    .component('users', {
      templateUrl: 'components/user/users/list.html',
      controller: 'UsersController',
      bindings: {
        users: '<',
        onSelect: '&?',
        onShow: '&?',
        onUpdate: '&?',
        onDelete: '&?',
        onAction: '&?'
      }
    });
})();
