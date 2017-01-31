(function () {
  'use strict';

  angular.module('common')
    .controller('NewUserController', Controller);

  /** @ngInject */
  function Controller($state, UserService) {
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
        });
    }

    function onCancel() {
      $state.go('users.list');
    }
  }
})();
