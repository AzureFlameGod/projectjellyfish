(function () {
  'use strict';

  angular.module('components.project')
    .controller('ProjectFormController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.budgetRegEx = /^\d{1,10}(?:\.\d{1,2})?$/;

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.doEvent = doEvent;

    function onInit() {
      ctrl.serverErrors = null;
    }

    function onChanges(changes) {
      if (changes.project) {
        ctrl.project = angular.copy(ctrl.project);
        ctrl.model = ctrl.project.attributes;
      }

      ctrl.isAdmin = false;

      if (changes.member) {
        ctrl.member = angular.copy(ctrl.member);
        ctrl.isAdmin = ctrl.member.attributes.role == 'admin' || ctrl.member.attributes.role == 'owner';
      }
    }

    function doEvent(event) {
      ctrl.serverErrors = null;

      return ctrl['on' + event]({
        $event: {
          project: ctrl.project
        }
      }).catch(function(errors) {
        ctrl.serverErrors = errors;
      });
    }
  }
})();
