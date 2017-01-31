(function () {
  'use strict';

  angular.module('common')
    .controller('EditUserController', Controller);

  /** @ngInject */
  function Controller($window, $state, UserService) {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;

    ctrl.onUpdate = onUpdate;
    ctrl.onCancel = onCancel;
    ctrl.onDelete = onDelete;

    // Enable/Disable
    // Change Password
    ctrl.onUpdatePassword = onUpdatePassword;

    function onInit() {
      ctrl.password = UserService.buildPassword();
    }

    function onChanges(changes) {
      if (changes.user) {
        ctrl.user = angular.copy(ctrl.user);
      }
    }

    function onUpdate(event) {
      return UserService
        .update(event.user)
        .then(function () {
          $state.go('users.show', {id: ctrl.user.id});
        });

    }

    function onUpdatePassword(event) {
      return UserService
        .updatePassword(ctrl.user.id, event.password)
        .then(function () {
          $state.go('users.show', {id: ctrl.user.id});
        });
    }

    function onCancel() {
      $state.go('users.show', {id: ctrl.user.id});
    }

    function onDelete(event) {
      var message = 'Delete the user "' + ctrl.user.attributes.name + '" from the database?';

      if ($window.confirm(message)) {
        return UserService
          .destroy(event.user)
          .then(function () {
            $state.go('users');
          });
      }
    }
  }
})();
