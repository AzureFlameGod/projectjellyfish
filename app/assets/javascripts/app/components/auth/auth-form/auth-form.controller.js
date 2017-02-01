(function () {
  'use strict';

  angular.module('components.auth')
    .controller('AuthFormController', AuthFormController);

  /** @ngInject */
  function AuthFormController(ErrorsService) {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.submitForm = submitForm;

    function onChanges(changes) {
      if (changes.user) {
        ctrl.user = angular.copy(ctrl.user);
      }
    }

    function submitForm() {
      ctrl.serverErrors = null;

      return ctrl.onSubmit({
        $event: {user: ctrl.user}
      }).catch(function(response) {
        ctrl.serverErrors = ErrorsService.parse(response);
      });
    }
  }
})();
