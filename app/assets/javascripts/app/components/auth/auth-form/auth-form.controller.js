(function () {
  'use strict';

  angular.module('components.auth')
    .controller('AuthFormController', AuthFormController);

  /** @ngInject */
  function AuthFormController() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.submitForm = submitForm;

    function onChanges(changes) {
      if (changes.user) {
        ctrl.user = angular.copy(ctrl.user);
      }
    }

    function submitForm() {
      ctrl.onSubmit({
        $event: {user: ctrl.user}
      });
    }
  }
})();
