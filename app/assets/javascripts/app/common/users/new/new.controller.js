(function () {
  'use strict';

  angular.module('common')
    .controller('NewUserController', Controller);

  /** @ngInject */
  function Controller($state, NotificationsService, UserService) {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.onCreate = onCreate;
    ctrl.onCancel = onCancel;

    function onInit() {
      ctrl.user = UserService.build();
    }

    function onCreate(event) {
      return UserService.create(event.user)
        .then(function (user) {
          $state.go('users.list');
          NotificationsService.success("Created new user " + user.attributes.name + " with " + user.attributes.role + ' permissions.', 'User Created');
        });
    }

    function onCancel() {
      $state.go('users.list');
    }
  }
})();
