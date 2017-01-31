(function () {
  'use strict';

  angular.module('common')
    .controller('UserShowController', Controller);

  /** @ngInject */
  function Controller(UserService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }

      if (changes.user) {
        ctrl.user = angular.copy(ctrl.user);
      }
    }

    function reload() {
      ctrl.reloading = true;

      return UserService.show(ctrl.user.id, ctrl.query)
        .then(function (response) {
          ctrl.user = response;
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }
  }
})();
